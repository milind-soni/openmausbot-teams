---
name: vps-security-audit
description: Audits VPS and web control panel security configurations.
---

# VPS Security Audit

Audits the security posture of VPS instances running web control panels such as CloudPanel, aaPanel, and Coolify. Covers non-intrusive network reconnaissance, administrative lockout recovery, service hardening, and multi-tier access status reporting. Does not perform aggressive penetration testing, exploit generation, or unauthorized brute-force attacks.

## When to Use

- "rà soát an ninh máy chủ", "kiểm tra bảo mật hosting", or "vps security audit"
- Diagnosing web panel ingress lockouts such as aaPanel "Safety entrance error"
- Recovering administrative access or resetting credentials for Coolify or aaPanel
- Auditing exposed database ports, FTP services, and HTTP security headers
- Reporting server access status clearly across Web UI and SSH levels
- Investigating database service crashes, OOM kills, or disk exhaustion on web control panels

## Procedure

1. Conduct non-intrusive external reconnaissance:
   - Check SSL/TLS certificate validity and HTTP security headers (`HSTS`, `X-Frame-Options`, `X-Content-Type-Options`) using Python `urllib` and `ssl`.
   - Probe common service and management ports (21, 22, 80, 443, 888, 3306, 5432, 6379, 7800, 8000, 8443) using Python `socket` connection tests to map the attack surface without requiring SSH credentials.
2. Diagnose and resolve control panel lockouts:
   - aaPanel Ingress / Safety Entrance recovery via SSH:
     - Check current entrance URL: `bt 14` or read `/www/server/panel/data/admin_path.pl`.
     - Set a new entrance path: `echo "/<path>" > /www/server/panel/data/admin_path.pl && bt 1` or run `bt 11`.
     - Temporarily disable entrance check: `rm -f /www/server/panel/data/admin_path.pl && bt 1`.
     - Create an emergency panel user: `python /www/server/panel/tools.py set_panel_user <username> <password>`.
   - Coolify PaaS administrator recovery via Docker:
     - Enter container tinker shell: `docker exec -it coolify php /var/www/html/artisan tinker`.
     - Update admin user password: `$user = User::where('email', '<email>')->first(); $user->password = Hash::make('<new_password>'); $user->save();`.
3. Formulate remediation and firewall policies:
   - Block direct internet exposure of database ports (MySQL 3306, PostgreSQL 5432, Redis 6379) and phpMyAdmin (port 888) via UFW (`ufw deny 3306` or whitelist trusted office IP).
   - Disable legacy unencrypted FTP (port 21) in favor of SFTP.
   - Verify PHP-FPM process and filesystem isolation per tenant or website user.
4. Investigate database crashes and harden service availability:
   - Detect memory pressure and OOM Killer terminations: `dmesg -T | grep -i oom` and inspect resource contention with co-located Docker containers (`docker system df`).
   - Check error logs: inspect `/www/server/data/*.err` or `/var/log/messages`.
   - Optimize MySQL configuration in `/etc/my.cnf`:
     - Tune memory buffer pool: set `innodb_buffer_pool_size` proportionally to available system RAM.
     - Prevent sleeping connection accumulation: set `wait_timeout = 60` and `interactive_timeout = 60`.
     - Expand connection limit and disable reverse DNS lookups: set `max_connections = 300` and `skip-name-resolve = 1`.
   - Configure service self-healing in systemd: add `Restart=always` and `RestartSec=3s` to the service unit file to ensure automatic recovery after crashes.
5. Execute disk triage and audit safely:
   - Run disk breakdown commands: `df -h /`, `du -sh /* 2>/dev/null | sort -rh | head -20`, `du -sh /www/wwwlogs/ /var/log/ /www/server/logs/`, `du -sh /var/cache/apt/`, and `journalctl --disk-usage`.
   - If port 22 is closed (`Connection refused`), scan candidate SSH ports with socket tests before requesting custom credentials.
6. Deliver structured access and finding reports:
   - Clearly delineate access status by layer: Web Panel UI status versus OS-level SSH root status.
   - Itemize exact technical requirements (SSH port, IP, root credentials, private keys) needed from stakeholders to proceed with remediation.

## Pitfalls

- Do not conflate web panel access with host-level access; report Web UI and SSH access as separate layers to avoid giving stakeholders false confidence.
- Never leave database engines (3306, 5432) or control ports exposed to public interfaces (`0.0.0.0/0`); restrict them to localhost or authenticated reverse proxies.
- Do not leave safety entrance paths disabled permanently on aaPanel; re-establish a protected entry token immediately after access is recovered.
- Avoid repeatedly attempting web logins when authentication fails to prevent triggering IP-level intrusion lockouts.
- Never synthesize or estimate disk usage or cleanup figures when SSH access is refused; report the blocked state explicitly and request custom port or credentials.
- Do not leave `wait_timeout` and `interactive_timeout` at excessive default values (e.g., 28800s) on servers running automated workflows or webhook integrations; shorten them to prevent pool exhaustion.
- Do not rely solely on manual restarts via web panels for crashing database services; enforce systemd `Restart=always` to prevent persistent downtime.

## Verification

Re-probe targeted service ports with socket connection checks to confirm exposed ports are closed, verify that web control panels return HTTP 200 on secure ingress paths, and check service status using `systemctl status <service>` or socket connection to verify auto-restart behavior.
