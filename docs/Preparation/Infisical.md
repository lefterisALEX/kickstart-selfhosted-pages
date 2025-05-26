---
sidebar_position: 6
---

# External Secrets - Infisical

We are using [Infisical](https://infisical.com/) to securely store all secrets related to your applications. Those secrets are pulled periodically (every 3 minutes) and can be used from the containers.

## Create a Project
First thing is that we need to create a new project and save the project ID as github secret with name `INFISICAL_PROJECT_ID`
![](../../static/img/infisical-project-id.png)

## Create Identity
Navigate to `Admin` -> `Access Control` -> `Identities` .  
Press **"Create Identity"** and select as **"Member"** as Role
![](../../static/img/infisical-create-identity.png)

Then press `Universal Auth` and after press `Add client secret` , give it a name and press **"Create"**. Save the generated client secret as github secret with name `INFISICAL_CLIENT_SECRET`
![](../../static/img/infisical-universal-auth.png)
![](../../static/img/infisical-add-client-secret.png)
![](../../static/img/infisical-create-client-secret.png)

Copy the `Client ID` and save it as github secret with name `INFISICAL_CLIENT_ID`  
![](../../static/img/infisical-client-id.png)

Now you should have 3 new secrets stored in github related with Infisical.

![](../../static/img/github-infisical-client-secret.png)


Lastly assign the new identity as Project Viewer
![](../../static/img/infisical-project-1.png)
![](../../static/img/infisical-project-2.png)


## Add secrets

Is important first to understand how the secrets are copied in to the VPS first.  
Below a structure of the folder containers our applications.

```
├── docker-compose.yaml
├── adguard
│   └── docker-compose.yaml
├── docker-backup
│   └── docker-compose.yaml
├── traefik
│   └── docker-compose.yaml
└── uptime
    └── docker-compose.yaml
```

In this structure there is a main `docker-compose.yaml` file which is used to configure:
1. Which other `docker-compose.yaml` files should be included, so in other words which other services should be enabled.
2. The docker network name and subnet.

example of a root docker-compose.yaml file

```
version: "3"
include:
  - ./traefik/docker-compose.yaml
  - ./docker-backup/docker-compose.yaml
  - ./dashy/docker-compose.yaml
  - ./uptime/docker-compose.yaml
networks:
  private_network:
    name: private_network
    driver: bridge
    ipam:
      config:
        - subnet: 172.29.1.0/24
```

All applications then have their own dedicated  `docker-compose.yaml` file under a specific directory.  
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

### Application specific secrets
In the above `docker-compose.yaml` for traefik we see that there are some environment variables used, `${DOMAIN}` and `${EMAIL}` . There is also a `env_file` read from the file `.secrets`.
The way how it works is that when the deployr script is executed is going to pull all secrets from infisical and place them under the same directory as defined in infisical.  
So all secrets stored in infisical under the directory traefik, are going to be copied to the file `./traefik/.secrets` and thus available to the containers traefik as defined in `./traefik/docker-compose.yaml`

### Common variables
In addition any secrets stored in the root directory in infisical will be available as variables accross all containers.  

