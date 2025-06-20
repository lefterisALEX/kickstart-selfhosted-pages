---
sidebar_position: 8
---
# Common Issues

<details>

<summary>Error: SSH key not found: main</summary>

The issue is that there is not SSH called main in your Hetzner Project. Please refer to section  [ssh-section](./Getting_Started/preparation/cloud_provider#ssh)

</details>

<details>
<summary>Error: Could not assume role with OIDC: Not authorized to perform sts:AssumeRoleWithWebIdentity</summary>

The issue is that the github runner do not have permissions to assume the IAM role in AWS. Make sure that:  
1. The [Trusted Policy](./Getting_Started/preparation/terraform_state#iam-role) the repository name is the correct one. 
2. The IAM role `github-oidc`  [exists](./Getting_Started/preparation/terraform_state#iam-role) and is called  `github-oidc`
</details>

<details>
<summary> Error: volume deletion is protected</summary>

You might face this issue when terraform tries to destroy/replace the volume. The reason is that by default the volume is protected. To allow destroying the existing volume you can set `volume_delete_protection = false` in `containers-host/terragrunt.hcl` before running the terraform destroy.  

Alternatively you can disable manually the delete protection from the Hetzner console and re-run terraform destroy.
</details>


<details>
<summary>ERROR  Error checking access to S3 bucket</summary>

The issue is that the name for the S3 bucket you choose is already in use very likely from another AWS account. You need to update the `AWS_S3_BUCKET` to use a different name. 
</details>

<details>
<summary>Error: cannot change type because the selected server_type has not sufficient disk space</summary>

This issue is because you are trying to replace the VPS with an instance type that is smaller compared to the previous one. The reason is that the smaller instance types comes with smaller root disks.
</details>

<details>
<summary>error: unable to authenticate with universal auth [err=APIError: CallUniversalAuthLogin unsuccessful response</summary>

You will see this error in logs of the deployr script. The reason might be one of the followings:
    1. The infisical client ID might be set wrong
    2. The infisical client secret is wrong
    3. The infisical project ID is wrong
    4. The infisical_api_url is set to wrong region.

Please review the configuration of External Secret at the preparation [page](./Getting_Started/preparation/external_secrets.md).
</details>


