---
sidebar_position: 2
---

# How it works

## General idea

The objective is to establish a fully automated deployment process that provisions all necessary infrastructure and containers as specified in the docker-compose.yaml files through a continuous integration/continuous deployment (CI/CD) pipeline. Aside from a few manual steps outlined in the Preparation section, all configurations will be defined in code. 

## Components

### Apps repository

This repository is where your `docker-compose` files are located. The Docker Compose files for the [kickstart-selfhosted-services](https://github.com/lefterisALEX/kickstart-selfhosted-services) template repository are located in the `container-host/apps` directory within the same repository, but it can configured to be any other repository.  

### VPS
A server that is running in a private network in Hetzner. When the server is boostraped docker/docker-compose is installed and your apps repository is also cloned under `/root/deployr` .

### Deployr script

The [deployr](https://github.com/lefterisALEX/docker-compose-deployr) script is pre-installed in the VPS and it's role is that periodically (every 3 minutes): 
1. Fetch latest code from your apps repository.
2. Fetch all secrets from your infisical project and save them locally in the VPS (see Secrets section below for more info)
3. If a new commit is detected, the system will execute the command docker compose up -d targeting your apps directory. By default, this command runs as docker compose up -d `/root/deployr/containers-host/apps/docker-compose.yaml`


## Docker-compose structure
Instead of having a large `docker-compose.yaml` file where we define all the services, we use instead the `include` command to split the configuration in multiple files.

Below is the default structure of the containers-host/apps folder in the kickstart-selfhosted-services template. This structure includes a root docker-compose.yaml file, along with a specific docker-compose.yaml file for configuring Traefik. Additionally, there is a docker-backup directory that contains its own docker-compose.yaml file for managing backup operations.

```
├── docker-compose.yaml
├── traefik
│   └── docker-compose.yaml
└── docker-backup
    └── docker-compose.yaml
```
### Root docker-compose file
The root  `docker-compose.yaml` file which is used to configure:
1. Which other `docker-compose.yaml` files should be included, so in other words which other services should be enabled.
2. The docker network name and subnet.

example of a root `docker-compose.yaml` file

```
version: "3"
include:
  - ./traefik/docker-compose.yaml
  - ./docker-backup/docker-compose.yaml
networks:
  private_network:
    name: private_network
    driver: bridge
    ipam:
      config:
        - subnet: 172.29.1.0/24
```

### Application docker-compose files

Both applications in this example (traefik/docker-backup) should have then their own dedicated  `docker-compose.yaml` file under a specific directory.  
For instance for the traefik application the `docker-compose.yaml` is the `traefik/docker-compose.yaml`

```
version: "3.8"

name: traefik

services:
  traefik:
    image: traefik:v3.3
    container_name: traefik
    ports:
      - 80:80
      - 443:443
      - 8080:8080
    networks:
      private_network:
    env_file:
      - .secrets
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /mnt/data/traefik/letsencrypt:/letsencrypt
    command:
      - "--api=true"
      - "--api.dashboard=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--entrypoints.web.http.redirections.entryPoint.to=websecure"
      - "--certificatesresolvers.letsencrypt.acme.dnschallenge=true"
      - "--certificatesresolvers.letsencrypt.acme.dnschallenge.provider=cloudflare"
      - "--certificatesresolvers.letsencrypt.acme.email=${EMAIL}"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.dashboard.entrypoints=websecure"
      - "traefik.http.routers.dashboard.tls.certresolver=letsencrypt"
      - "traefik.http.routers.dashboard.rule=Host(`dashboard.${DOMAIN}`) && (PathPrefix(`/api`) || PathPrefix(`/dashboard`))"
      - "traefik.http.routers.dashboard.service=api@internal"
    restart: always
```

## Persistent Storage

The setup provision a volume in Hetzner which is attached in the VPS under `/mnt/data`. Any data that need to persist is highly recommeneded to be stored there.
This can be done by mounting the path inside the container under `/mnt/data/application_name`.   
By storing persistent data in an external volume, the data remains unaffected by the lifecycle of the VPS. This means that if the VPS is replaced, the data in the external volume will not be lost. Additionally, the external volume comes with delete protection enabled by default, ensuring that it cannot be deleted without first disabling this protection.

:::tip
It is not necessary to store application-specific persistent data under the directory `/mnt/data/application_name`. For instance, Traefik's persistent data can reside in any subdirectory within /mnt/data. However, it is recommended to maintain a structured organization that suits your needs for better management and accessibility.
:::

## Secrets

### Infrastructure secrets
All secrets, except those use by the containers are storeed as [repository secrets in Github](Preparation/Github#github-secret), so they can be consumed during the execution of the pipeline.

### Common Secrets for all Applications


Secrets that need to be used inside the containers are stored as external secrets at [infisical](https://infisical.com/).
All secrets that are stored in the root directory of infisical are going to be downloaded and stored in the VPS in an `.env` file along with the root `docker-compose.yaml` . That way those secrets will be available to all containers as environment variables.
![](../static/img/infisical-root-secrets.png)

```yaml
├── docker-compose.yaml
├── .env #This file will contain the secrets highlighted above
├── traefik
│   └── docker-compose.yaml
└── docker-backup
    └── docker-compose.yaml
```

:::info
    Downloading the secrets and storing them in the `.env` file is done by the deployr script and this action is executed periodically. 
:::

### Application Specific Secrets

For secrets that we want to be available only for specific containers we can store them under a directory at infisical with the name of the application. (The directory name at the infisical should match the directory name of the application in the apps directory).  
For example in the kickstarted example all secrets stored in Infisical under the `traefik` directory will be copied to the file `./traefik/.secrets`, making them accessible to the Traefik containers as defined in `./traefik/docker-compose.yaml`.
![](../static/img/infisical-traefik-secret.png)

```yaml
├── docker-compose.yaml
├── .env
├── traefik
│   ├── docker-compose.yaml
│   └── .secrets #This file will contain the secrets highlighted above
└── docker-backup
    └── docker-compose.yaml
```
:::tip
    To create a `.secrets` file for each application, we can create a corresponding directory in Infisical with the same name. For example, to create a `.secrets` file for the `uptime` application, we need to create an `uptime` directory in Infisical and store the relevant secrets there. These secrets will then be saved in the file `./uptime/.secrets`.
:::
