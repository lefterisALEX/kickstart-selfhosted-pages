---
sidebar_position: 2
---
# Backup & Restore

## Backup 

By default, backups are enabled and executed daily using the [docker-volume-backup tool](https://github.com/offen/docker-volume-backup). These daily backups are stored in the `/backups` directory, with a default retention period of 7 days.  
If you rely on this module to store important data, it's crucial to implement a comprehensive backup strategy. Consider storing your backups in multiple locations, ideally including offsite options, to enhance data security. Additionally, you may want to extend the retention period to ensure that your valuable data is preserved for a longer duration.

You can adjust the settings of the docker-volume-backup container by editing the `docker-compose.yaml` file located at `containers-host/apps/docker-backup/`. For instance, to increase the retention period, simply modify the `BACKUP_RETENTION_DAYS` value.
For more advanced configuration options, please refer to the docker-volume-backup [documentation](https://offen.github.io/docker-volume-backup/) for detailed guidance.

:::tip
    Note that you can use the label `docker-volume-backup.stop-during-backup=true` .This means the container will be stopped during backup to ensure.
:::
## Restore

To restore data from a backup, you can follow the procedure outlined in the Docker Volume Backup guide [documentation](https://offen.github.io/docker-volume-backup/how-tos/restore-volumes-from-backup.html). Below is an example workflow demonstrating how to restore the data for the **uptime_kuma** container using the backup file named `backup-2025-05-31T03-03-00.tar.gz`.


**1. View backup content:** View all the directories included in the backup file.
```
tar -tvf /backups/backup-2025-05-31T03-03-00.tar.gz  | grep -E '^d.* /backup/[^/]+$'
```
**2. Extract backup:** Extract the  `uptime_kuma`  content of the backup file to the `/tmp`
```
tar -C /tmp -xvf /backups/backup-2025-04-01T03-03-00.tar.gz /backup/uptime_kuma
```

**3. Stop the Container:** Stop the uptime_kuma container to prevent any data changes during the restoration process.
```
docker stop uptime-kuma
```

**4. Rename Current Data:** For any case is good to keep temporarily a backup of the existing data you are going to replace. If backup is successful you can safely delete the copied directory.
```
mv  /mnt/data/uptime-kuma /mnt/data/uptime-kuma.bak
```
**5. Restore the data** Restore the data and ensure that the original attributes are preserved during the copying process.
```
cp -a /tmp/backup/* /mnt/data/
```

**6. Start the Container:** Start the uptime_kuma container to prevent any data changes during the restoration process.
```
docker start uptime-kuma
```

**7. Cleanup:** If backup is succesful is good to cleanup the directories you created
```
rm -rf /tmp/backup
rm -rf /mnt/data/uptime-kuma.bak
```
