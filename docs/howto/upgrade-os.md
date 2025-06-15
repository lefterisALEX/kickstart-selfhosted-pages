---
sidebar_position: 4
---
# Upgrade Host OS

## Major & Minor Releases
To upgrade the host operating system of your VPS, you can modify the Ubuntu version specified in the `terragrunt.hcl` file located in the `containers-host` directory. Look for the line:
```
image = "ubuntu-24.04"
```

You can change the version number to your desired Ubuntu release. However, please note that the module has been tested with a specific version only—the default one. Changing this version may lead to compatibility issues or breaking changes.

For a smoother upgrade experience, it is advisable to also upgrade the Terraform module version for CloudStack to ensure compatibility with the latest tested version of the host OS.

## Security Patching

Ubuntu will apply security updates automatically, without user interaction. This is done via the unattended-upgrades package, which is installed by default.

:::note
    You might need to reboot the VPS in order to apply some of the security patches, you will get a message in the terminal when you login to the VPS if that is the case.
:::

