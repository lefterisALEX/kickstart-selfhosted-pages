---
sidebar_position: 2
---
# Enabling Automatic Pipeline Execution on PR Merge

To enable the deployment pipeline to run automatically when a Pull Request (PR) is merged into the main branch, you need to uncomment specific lines in the `.github/workflows/deploy.yaml` file. Locate the following section:
```
name: Deploy

on:
  # push:
  #   branches: [ main ]
  #   paths:
  #     - "infra/**"
  #     - "containers-host/**"
  #     - ".github/workflows/**"
  #     - "!containers-host/apps/**"
  workflow_dispatch:

```

By uncommenting the lines related to the push event, the deployment pipeline will be triggered automatically every time a PR is merged into the main branch. This eliminates the need to manually initiate the deployment from the web UI.

:::note
    Please note that the pipeline will not be triggered if there are changes made to any files within the `containers-host/apps` directory. This is intentional, as we want the deployer script to manage updates to the Docker Compose files located in the apps directory.
:::
