---
sidebar_position: 3
---
# Upgrade  Module

You can find the released versions of the module, along with their release notes, at this [link](https://github.com/lefterisALEX/terraform-hetzner-cloudstack/releases). It is essential to read the release notes carefully before upgrading to a new version, as updates may introduce breaking changes.

To change the module version, update the following line in the `containers-host/terragrunt.hcl` file:

```
terraform {
  source = "github.com/lefterisALEX/terraform-hetzner-cloudstack.git//?ref=v2.1.7"
}
```

Make sure to replace `v2.1.7` with the desired version tag you wish to use.

