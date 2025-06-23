---
sidebar_position: 1
---

# Introduction

This repository provides a quickstart template for deploying a VPS on Hetzner to host your self-hosted services using Docker and Docker Compose. 

At the core of this setup is used the [terraform-hetzner-selfhosted-services-host](https://registry.terraform.io/modules/lefterisALEX/selfhosted-services-host/hetzner/latest) Terraform module, which handles the provisioning of the infrastructure and necessary system services.

## What It Automates

By following this guide, you will fully automate the provisioning and configuration of:
- **A Hetzner VPS** to host your services
- **Docker Compose** for running your self-hosted applications
- **Secret management** via Infisical, ensuring your services receive up-to-date and securely managed environment variables
- **A syncer service** [(deployr)](https://github.com/lefterisALEX/docker-compose-deployr) to keep Docker Compose files on the VPS in sync with your GitHub repository and Infisical secrets, enabling a GitOps-style workflow


![Example banner](../static/img/architecture.svg)

## Integrated Tooling

In addition, the guide helps you integrate:

- **Let's Encrypt** – for automated TLS certificate issuance and renewal
- **Infisical** – to securely manage secrets used by your containers
- **Cloudflare** – to manage DNS for your domains
- **AWS S3** – to store Terraform state securely
- **GitHub Actions** – for CI/CD to apply infrastructure changes
- **Tailscale** – for secure VPN access to your services

## Why Use This Guide?

This setup enables you to build a fully automated and reproducible self-hosting environment. The infrastructure and service configuration are defined as code, so you can:
- Destroy and recreate your entire environment at any time
- Track changes through version control
- Minimize manual intervention and configuration drift

This approach is immutable in spirit—meaning the entire system state can be re-established from code, secrets, and remote state.

## Who Is This For?

This guide is especially useful for people who:

- Prefer hosting self-managed services on a cloud VPS (rather than a home server), while keeping access secure through VPN
- Want to learn and practice Infrastructure as Code using Terraform and Terragrunt
- Value reproducibility, automation, and a clean GitOps-style deployment model for personal infrastructure


