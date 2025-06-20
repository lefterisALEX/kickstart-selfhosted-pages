---
sidebar_position: 6
---

# External Secrets

We are using [Infisical](https://infisical.com/) to securely store all secrets related to your applications. Those secrets are pulled periodically (every 3 minutes) and can be used from the containers.

## Create a Project
First thing is that we need to create a new project and save the project ID as github secret with name `INFISICAL_PROJECT_ID`
![](../../../static/img/infisical-project-id.png)

## Create Identity
Navigate to `Admin` -> `Access Control` -> `Identities` .  
Press **"Create Identity"** and select as **"Member"** as Role
![](../../../static/img/infisical-create-identity.png)

Then press `Universal Auth` and after press `Add client secret` , give it a name and press **"Create"**. Save the generated client secret as github secret with name `INFISICAL_CLIENT_SECRET`
![](../../../static/img/infisical-universal-auth.png)
![](../../../static/img/infisical-add-client-secret.png)
![](../../../static/img/infisical-create-client-secret.png)

Copy the `Client ID` and save it as github secret with name `INFISICAL_CLIENT_ID`  
![](../../../static/img/infisical-client-id.png)

Now you should have 3 new secrets stored in github related with Infisical.

![](../../../static/img/github-infisical-client-secret.png)


Lastly assign the new identity as Project Viewer
![](../../../static/img/infisical-project-1.png)
![](../../../static/img/infisical-project-2.png)


## Add required secrets

Is important first to understand how the secrets are copied in to the VPS first, if you haven't done already take a look first in [how it works](../../how_it_works.md) section.

We need to create the following 3 secrets in order to be able to complete the DNS challenge.
 1. **DOMAIN:** The domain name for which you want to enable TLS. In this example `238749.xyz`
 2. **EMAIL:** The email address which will provided to Let's Encrypt.
 3. **CF_DNS_API_TOKEN**: The API token you generated in your Cloudflare account from the previous step. This token will be used to authenticate API requests to manage DNS records. This secret should be created inside a directory called `traefik`, since should be available only in the traefik container.



### DOMAIN and EMAIL Secret

To create the secret we click on **"Add secret"** button and fill the `Key` `Value` and `Environments` where this secret will be available.
![](../../../static/img/infisical-add-secret-button.png)
![](../../../static/img/infisical-domain-secret-create.png)

Repeat the same to create the EMAIL secret. After that it should look like the screenshot below.
![](../../../static/img/infisical-domain-secret.png)

:::note
    Make sure all secrets are available for Production environment since the deployr script that downloads the secrets is looking for the secrets available for Production Environment only
:::

### CF_DNS_API_TOKEN secret

We need to create the `CF_DNS_API_TOKEN` so can be used from the Traefik container to authenticate API requests against Cloudflare. We want this secret to be available only for Traefik container, so we create it inside a directory called `traefik`

![](../../../static/img/infisical-create-directory.png)
![](../../../static/img/infisical-traefik-directory.png)

:::warning
    The name of the directory at infisical should match the name of the directory where the `docker-compose.yaml` for Traefik is stored in the apps directory. In our case both directory are `traefik` 
:::
![](../../../static/img/secrets-match.png)

Under the traefic directory you need to create a new secret called  `CF_DNS_API_TOKEN` and store the value of the API token you generated in [Cloudflare](../../Getting_Started/preparation/cloudflare#generate-api-key)
![](../../../static/img/infisical-traefik-secret.png)


