---
sidebar_position: 6
---

# Initial Deploy

After all pre-required steps are done you can deploy your stack by running the `Deploy` Github Action.

![](../static/img/github-deploy-2.png)

If all above steps are done properly the pipeline should be executed without issues.

![](../static/img/action-passed.png)

If you login to tailscale you should be able to see your server be registered and connected to the tailscale network.

![](../static/img/tailscale-connected.png)

Also in Hetzner you should be able to see the server running.

![](../static/img/hetzner-server-runs.png)

If everything went smoothly you should be access the dashboard of traefik `https://dashboard.your-domain.com/dashboard/`  from any device connected to your tailscale network.
So in our example i was able to connect to `https://dashboard.238749.xyz/dashboard/`
![](../static/img/traefik-dashboard.png)

:::warning
    The trailing slash / in /dashboard/ is mandatory
:::


