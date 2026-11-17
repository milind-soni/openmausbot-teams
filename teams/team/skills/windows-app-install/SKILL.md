---
name: windows-app-install
description: Install Windows desktop apps and verify they run.
---

# Installing Windows Desktop Apps

Takes a Windows app from 'not installed' to a verified running service on the user's own machine, using the user's browser for the download when the sandboxed shell cannot reach the network and a wrapper that restores the full Windows environment when the harness's own launch channel omits it. It covers download, install, launch, a real status check, and post-install settings the user asks for (data-directory relocation, start at login). It does not bypass the installer's UAC prompt and does not change settings the user did not ask about.

## When to Use

- '帮我装一下 Docker / Git / 某个桌面软件', '帮我下', 'download and install it for me'.
- A feature the user wants needs a desktop runtime that is missing (a private desktop that requires Docker Desktop, for example).
- `winget` or a shell download fails and the user still expects the app installed.
- '装到 D 盘', '把安装包放到 D 盘', or the user says the C: drive is short on space.
- An app is already installed but the user wants a setting changed: '把 Docker 的数据盘挪到 D 盘', '打开开机自启'.

## Procedure

1. Confirm you are on the machine that should receive the install: after any work on the private desktop, call `mcp__agents__select_computer` to switch back to the user's own computer and prove it with `hostname` and `whoami`, since otherwise host-only commands run inside the VM. Then check what is already installed before touching anything: `Test-Path` the usual install paths, `Get-Command <exe>`, and `winget list --id <Publisher.App>`. If present, skip to launching and verification.
2. If sandbox file/ACL denials block commands in the workspace, repair them first with the `diagnose-windows-sandbox-acl` skill, then continue.
3. Try the package manager: `winget install --id Docker.DockerDesktop -e --accept-package-agreements --accept-source-agreements` for Docker, or the matching publisher id for another app.
4. If the package manager is unavailable or the shell has no outbound network (a quick probe such as `curl.exe -s -o NUL -w "%{http_code}" --max-time 20 https://www.baidu.com` returns `000`), download through the user's own browser instead of asking them to fetch it: `mcp__computer__launch_app` with `{session, urls: [official installer URL]}`. Keep one session id for the whole install.
5. Poll the download instead of sleeping blind: list `"$env:USERPROFILE\Downloads"` sorted by `LastWriteTime`, and treat a `*.crdownload` file or a size that is still changing as not finished. When the user wants the installer on D:, move the finished file with `Move-Item` to `D:\Downloads` and report the final path and size.
6. Run the installer silently and wait for it: `Start-Process -FilePath $exe -ArgumentList 'install','--quiet','--accept-license' -Wait`. Tell the user a UAC prompt will appear and that they must click 是.
7. Launch the app through a wrapper that restores the complete Windows environment. Write a small `.ps1` that sets `$env:SystemDrive='C:'`, `$env:SystemRoot='C:\Windows'`, `$env:windir='C:\Windows'`, `$env:ALLUSERSPROFILE='C:\ProgramData'`, `$env:ProgramData='C:\ProgramData'`, `$env:ProgramFiles`, `${env:ProgramFiles(x86)}` and `$env:CommonProgramFiles`, then `Start-Process` the app's exe; start it with `mcp__computer__launch_app` passing `additional_arguments` of `-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File <wrapper.ps1>`. Confirm the process appears with `Get-Process`.
8. For a long first start (engine boot, image build), keep the work in a hidden script that appends to a log and poll that log with `Get-Content` in bounded 20-45 second checks; do not block one call for minutes.
9. If a required Windows service is stopped (Docker's is `com.docker.service`), start it elevated: `Start-Process powershell -Verb RunAs -ArgumentList '-Command','Set-Service com.docker.service -StartupType Automatic; Start-Service com.docker.service'`, ask the user to approve UAC, then relaunch the app.
10. Verify the service, not just the process: for Docker, `${env:ProgramFiles}\Docker\Docker\resources\bin\docker.exe info --format '{{.ServerVersion}}'` and `docker version`.
11. Once the runtime answers, enable the dependent feature (for a private desktop, `mcp__agents__app_settings` with `{action: 'set', id: 'desktops.privateDesktop', value: {mode, idleTimeoutMinutes}}`) and open it with `mcp__agents__select_computer` `{surface: 'vm'}`. If the app builds its own desktop image, confirm it exists with `docker images` first; when missing, run the app's own image-prepare flow (or its bundled build script) with the same restored environment, and expect a multi-GB base-image pull.
12. Change a working app's settings through its own window, not by editing registry or config files. If the window starts minimized or off-screen, call `mcp__computer__bring_to_front` and then `mcp__computer__set_window_frame` with `x: 0, y: 0` and a usable `width`/`height` so its controls can be read.
13. Find each control with `mcp__computer__get_window_state` plus a `query` for the visible label ('Disk image location', 'start on login', 'Browse'), click by accessible name/role with `mcp__computer__run_steps` (`{click: {name, role}}`), and write paths into text fields with `mcp__computer__set_value` instead of typing. For Docker Desktop: Settings → Resources → Advanced → Disk image location → set `D:\DockerData\wsl` → Apply; the engine restarts and migrates the disk (about 5 GB, a minute or two). In the same Settings visit also enable 'Start Docker Desktop when you sign in', so the user gets one window session, not two.
14. After the engine restart, restart whatever depended on it and verify it: `docker start openmausbot-computer`, then poll `Invoke-WebRequest http://127.0.0.1:6080/` until it returns HTTP 200. Confirm `$env:APPDATA\Docker\settings-store.json` carries the new path, the D: folder holds the disk image, and the old C: location is empty; report free space on both drives.

## Pitfalls

- Do not hand the user manual download-and-install steps before trying the browser route; '帮我下' means drive it yourself through `launch_app`.
- A `.crdownload` file or a growing byte size is an unfinished download; confirm the final filename and size before installing.
- 'Known folder' or ProgramData-not-found errors at launch mean the starting process environment is missing `SystemDrive`/`ALLUSERSPROFILE`/`ProgramData`, not that the install is corrupt; relaunch through the env-restoring wrapper before resetting, repairing or reinstalling.
- First-run engines need time: poll `docker info` in short bounded checks of 15-20 seconds rather than one long loop, because the harness interrupts long blocking steps.
- A server-version error right after launch is normal startup latency, not a failed install; re-check before reporting a problem.
- Do not call the install done when the installer exits; only the app's own status command counts.
- Do not read a blocked shell download as proof the app cannot be installed; the browser path exists for exactly that case.
- Docker Desktop's `DataFolder` registry value only relocates the virtual-machine disk; current versions ignore a hand-edited `WSLDataFolder`. Move the WSL disk through the app's own Settings → Resources → Advanced → Disk image location, apply, restart, and say plainly that this step needs the app window on screen.
- The program itself installs on C: even when the user asks for D: — only the installer file and the data directory can move. State which part moved and which cannot.
- Do not reset or delete app data to fix a launch error before confirming no images or containers exist; a factory reset is acceptable only when the data directory is empty.
- The user saying the reboot finished, or that the app shows Engine running, is not verification; run the status command yourself before acting on it or reporting status.
- `mcp__computer__press_key` and `mcp__computer__scroll` can fail on an element token taken from a dialog; re-query the window for the field, click it, and use `set_value` for the path instead of retrying keystrokes.
- Docker Desktop's GUI migration nests the disk under the chosen folder (`D:\DockerData\wsl\DockerDesktopWSL`); accept the nested layout, do not hand-copy, rename or pre-create that disk.
- A relocated data directory is not the finish line: the engine restart stops every container, so restart the dependent one and prove it with an HTTP check before reporting success.
- Track which surface you are on, because a switch persists across turns: before host-only commands switch back with `mcp__agents__select_computer` and prove it with `hostname`/`whoami`, and when the user asks which desktop you are on, answer from those commands plus `mcp__computer__list_windows`, never from memory.

## Verification

Run the app's own status command and confirm a non-error answer (for Docker, `docker info --format '{{.ServerVersion}}'` prints a version), then confirm the dependent feature actually opens. If the data directory was relocated, confirm the app's settings file shows the new path, the new location holds the disk, the old location is empty, and a container or image operation — or the dependent container's own port — still answers.
