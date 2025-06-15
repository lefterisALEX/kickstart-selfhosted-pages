---
sidebar_position: 9
---
# FAQ 

<details>
<summary>Do i need to use Infisical for secret management?</summary>

If you have another way of managing secrets you can disable infisical and use your way. To do that you need to set `enable_infisical = false` to the file `containers-host/terragrunt.hcl` . Make sure you pass the `DOMAIN` , `EMAIL` and `CF_DNS_API_TOKEN` variables to traefik.
</details>

<details>
<summary>Can i use different backend for the terraform state</summary>

Yes you can configure a different backend and you can skip the configuration of AWS completely. You will need to do some changes in the root `terragrunt.hcl` file to update the `remote_state` block and modify the `./.github/workflows/deploy.yaml` and `./github/workflows/destroy.yaml` to be able to able to reach the resource where your state will be stored.
</details>

<details>
<summary>Can i use different reverse proxy?</summary>

While it is possible to configure a different reverse proxy, the documentation on this page does not provide specific instructions for doing so. To remove Traefik, you can follow these steps:

    1. Delete the Traefik directory.  
    2. Uncomment the relevant line in the root Docker Compose file.  
    3. Remove any associated labels in the other Docker Compose files.
</details>

<details>
<summary>Where can i find the deployr script?</summary>

The deployr script is located at `/usr/local/bin/deployr.sh` and the source code in github is [here](https://github.com/lefterisALEX/docker-compose-deployr)
</details>

<details>
<summary>Can i trigger the deployr script manually?</summary>

Yes if you are logged in with SSH at the VPS you can run the command `deployr.sh`  which is going to trigger the execution of the deployr script.
</details>

<details>
<summary>Can i see the logs of deployr script?</summary>

Yes if you are logged in with SSH at the VPS you can run the command `journalctl -u deployr.service`  
</details>




