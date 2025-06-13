---
sidebar_position: 1
---

# Introduction


This guide provides a fully automated and opinionated approach to deploying and managing your self-hosted services on Hetzner using Docker Compose and Terraform. This setup is ideal for individuals who:

 - Prefer to host their self-managed services on a VPS rather than a home server, ensuring secure access via VPN.
 - Are interested in using self-hosted services as a means to learn Infrastructure as Code (IaC) with Terraform and Terragrunt.

## Overview

This project demonstrates how to leverage the [Hetzner Seflhosted Services Host](https://registry.terraform.io/modules/lefterisALEX/selfhosted-services-host/hetzner/latest) Terraform module to deploy your self-hosted services efficiently. By following the steps outlined in this guide, you will set up a Hetzner instance that automatically clones your code from a GitHub repository, manages secrets using Infisical, and utilizes Docker Compose for application deployment.

![Example banner](../static/img/architecture.svg)
## Services Used

The entire setup utilizes various services, each serving a specific purpose:

 1. **Hetzner** is used to deploy the Virtual Private Server inside a Virtual Private Network.
 2. **AWS S3** is used to save the terraform state.
 3. Tailscale is used as VPN between your devices and the Hetzner Private Network.
 4. **Github** is used to deploy emphemeral runner inside your Hetzner Private Network, but also used  as Identity Provider to login to tailscale.
 6. **Traefik** is used for reverse proxy.
 7. **LetsEncrypt** is used for Automatic Certificate Renewal. 
 5. **Cloudflare** is used for DNS configuration.

This guide not only helps you learn about these technologies but also walks you through the necessary steps to set up your environment effectively.

