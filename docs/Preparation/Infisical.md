---
sidebar_position: 5
---

# Infisical

## Infisical

There are stored all secrets related with your applications.  

1. Create a project and save the project ID as github secret with name `INFISICAL_PROJECT_ID`
![](../../static/img/infisical-project-id.png)

2. Navigate to `Admin` -> `Access Control` -> `Identities` .  
Press "Create Identity" and select as `Member` as Role
![](../../static/img/infisical-create-identity.png)

3. Press `Universal Auth` and then press `Add client secret`. Give it a name and press Create. Save the generated client secret as github secret with name `INFISICAL_CLIENT_SECRET`
![](../../static/img/infisical-universal-auth.png)
![](../../static/img/infisical-add-client-secret.png)
![](../../static/img/infisical-create-client-secret.png)

4. Copy the `Client ID` and save it as github secret with name `INFISICAL_CLIENT_ID`  
![](../../static/img/infisical-client-id.png)

Now you should have 3 new secrets stored in github related with Infisical.

![](../../static/img/github-infisical-client-secret.png)


5. Assign the new identity as Project Viewer
![](../../static/img/infisical-project-1.png)
![](../../static/img/infisical-project-2.png)


