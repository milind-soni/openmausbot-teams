---
name: windows-popup-diagnosis
description: Diagnose and stop recurring popup windows on Windows.
---

# Diagnosing Recurring Windows Popups

Identifies an unexplained window that keeps appearing on the person's Windows machine, traces it to the process and launcher that creates it, and removes the cause so it stops coming back. It covers identification, owner tracing and the fix; it does not treat the window as malware unless the owner process proves to be one, and it does not change unrelated app settings.

## When to Use

- '为什么经常弹出来这个东西', 'this black box keeps popping up', '帮我解决一下' with a screenshot of an unknown window or dialog.
- A window returns every time an app or the built-in browser is launched, even after the person closes it.
- A background command window, terminal, or installer-permission dialog appears in front of the person repeatedly.

## Procedure

1. Get the window's text. Try `read_image` on the screenshot first. If the image tool fails on the attached PNG, copy the file into the task workspace and OCR it there: write a small PowerShell script that copies the file into the workspace, decodes it with `Windows.Media.Imaging.BitmapDecoder`, and recognizes it with `Windows.Media.Ocr.OcrEngine.TryCreateFromUserProfileLanguages()`, printing every line. Run it with `powershell.exe -NoProfile -ExecutionPolicy Bypass -File <script>`. The window title and body text are the identifier you need.
2. Map the visible window to a process with a small `Add-Type` P/Invoke script using `EnumWindows`, `GetWindowText`, `GetClassName`, `IsWindowVisible` and `GetWindowThreadProcessId`. Record title, class and PID. The class tells you the subsystem: `ConsoleWindowClass` is a real console, a dialog class means the app raised it.
3. Trace the owner chain: `Get-CimInstance Win32_Process -Filter "ProcessId=<pid>" | Select-Object ProcessId,ParentProcessId,Name,CommandLine,CreationDate`, repeated for each ancestor PID. The command line names the script, batch file or launcher that raises the window.
4. Read that launcher (`Get-Content <path>`). Confirm whether it is the app's own helper that starts a console program, and whether the window is expected to be hidden.
5. Fix the cause, choosing the narrowest option that fits:
   - If the app exposes a headless/background setting, use it instead of a system change.
   - If a background `cmd.exe`/conhost console is being taken over by Windows Terminal, switch the default terminal to the Windows Console Host: Settings > System > Developer options > Terminal > Default terminal application > Windows Console Host, or the same choice in the registry at `HKCU:\Console\%%Startup` (`DelegationConsole` = `{B23D10C0-E52E-411E-9D5B-C09FDF709C7D}`, `DelegationTerminal` set to match).
6. Kill the leftover window process once (`Stop-Process -Id <pid> -Force`) so the next launch uses the new setting, then restart the app that owns the launcher.
7. Verify with the real trigger: repeat the action that used to raise the popup (open the built-in browser, start the app) and check with `Get-Process WindowsTerminal,cmd,conhost` that no new visible console appeared, and that the app still works.
8. Answer briefly: what the window was, what you changed, and the one-line revert path. Do not narrate the failed screenshot attempts.

## Pitfalls

- Do not just close the window; a launcher that runs on every app start recreates it, so fix the spawning command line or the delegation setting.
- Do not call an unexplained popup malware or adware before you have the title, class and owner process; most repeated console windows come from the assistant's own app launching a console helper.
- A console titled with a bare `cmd.exe` path is a background launcher, not the person's terminal session.
- When the image tool cannot read a screenshot, OCR it locally instead of asking the person to resend it or retype the text.
- Prefer the app's own setting over a system-wide console delegation change; a registry edit affects every console app on the machine and must be reported with its revert path.
- Re-verify with the actual trigger after the fix, not by observing a quiet screen at that moment.
- Delete the temporary OCR/enumeration scripts from the workspace when done.

## Verification

The action that used to raise the popup now runs with no new console or dialog window, the owning app still works, and the reply states the cause plus how to revert the change.
