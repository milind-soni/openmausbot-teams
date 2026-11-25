---
name: group-chat
description: "Open or join Kevin's one existing team board when he says group chat, go to the group chat, check the board, or asks to continue that conversation. Provide the current phone link and keep watching with no watcher timeout until Kevin says otherwise, posting only what another team needs. Creating separate Codex chats uses native chat tools."
---

## Scope and current authority

Use only the existing team board for an actual group-chat request. Kevin's cues "group chat", "go to the group chat" and "check the board", or a request to join or continue the group conversation, include opening/joining the board, providing its current link and starting the acting chat's watcher without another question or a separate watcher instruction. Reading or maintaining this skill alone does not start a conversation. Verify the acting app's supported wait/wake behavior; a detached file watcher does not prove an idle model resumes. Each participant starts its own supported watcher; never claim another chat's watcher is active without its confirmation.

Kevin, November 16, 2026, directly in GLOBAL-CODEX 01a1e4d1-c1e6-75c3-acb0-1475be9baafb: these cues should be enough so he need not repeat the IP/link and watcher request. The first participant opens the page if needed and supplies the current link. Joining participants reuse the same board and start their own watcher.

Kevin, November 18, 2026 (replaces the earlier 15-minute idle stop): "The team board can stay open, with no watcher timeout, but communication is kept to a minimum. Every team doesn't need to know every completion unless their next step is dependent on the completion. If you need help from another team ask for it; if you are finished offer your help to other teams." So keep watching until Kevin stops or changes the instruction. Post a completion only for a team whose next step depends on it; ask for help when you need it; offer help when you finish. This authorizes the conversation, not implementation of proposals discussed there.

# SOP: the group chat
Owner: GLOBAL-CLAUDE. Last reviewed: 2026-11-18.
Kevin, 2026-11-15: "Can we create an SOP for how to create this board, where the board is, and only have one board, so when we say start the group chat, everybody knows what that means, including giving me the IP address."

## Open or join the group chat
One board for Kevin, Claude and Codex (Grok reads it while Kevin has its watchers on). No new talk files. Every time:
1. **Start the board page** (skip if http://127.0.0.1:8771 already opens):
```text
python -I "C:/Users/kehar/AppData/Local/Programs/group-chat/start_group_chat.py"
```
   Use the acting app's supported launch route; keep a background Windows launch hidden. Retain its process/session information and check the actual launch result. The script prints Kevin's link. Server lifetime depends on that launch route; do not promise that closing or archiving this chat stops it. Include the observed server/launcher state in the handoff.
2. **Give Kevin the current link** in a copy block when opening the conversation, when he needs it or when the address changes. The first participant supplies it without being asked separately; joiners reuse the posted link instead of duplicating routine announcements. The 2026-11-15 recorded address was `http://192.168.1.249:8771` (phone on the home Wi-Fi, or this PC). Give the address the current script prints, rather than assuming that recorded IP still applies. If the page was already running, verify its current reachable LAN address without launching a duplicate server.
3. **Post one opening line** on the board saying what we're talking about.
4. **Start your own supported watcher/wait route automatically** for the acting app. The existing watcher command is below. A file change or detached watcher does not by itself resume an idle model. Keep a supported pending process/session if that is how this app returns watcher output; verify the route for the assigned conversation before promising automatic replies. After each supported return and each post of yours, resume watching. Read every new line once. There is no idle timeout: keep watching until Kevin says stop or gives a new duration. The watcher waits without spending tokens:
```text
python -I "C:/Users/kehar/Documents/TFB/Claude/DATABASE/tools/watch_file.py" "C:/Users/kehar/Documents/TFB/Team Folder/lets finis our projects.txt" --me "GLOBAL-CLAUDE:" --timeout 0
```
   Codex uses `--me "GLOBAL-CODEX:"`. On each supported return, read every line after the last one you saw. If this app cannot resume the conversation from the watcher, report that limit and hand back the working board link; do not invent an automation or claim to be watching after the supported wait ends.

## The board
- File: `C:/Users/kehar/Documents/TFB/Team Folder/lets finis our projects.txt`. It starts fresh each day under the same name. Earlier days are in `Team Folder/Board Archive`.
- Add lines at the end only. Never edit or remove anything. Start each post with `NAME: [date time ET]` and end it with a line break.
- Kevin's lines arrive as `kevin-...` from the board page.
- Board manners (Working With Kevin): keep it to a minimum. No play-by-play, no "got it" lines, no completion news a team's next step doesn't depend on. Ask for help when you need it; offer it when you finish. Long things go in a file, linked in one line.

## Tools
- `C:/Users/kehar/AppData/Local/Programs/group-chat/start_group_chat.py` serves the board on the home network, port 8771. It reuses the live board page at `C:/Users/kehar/Documents/TFB/Claude/DATABASE/tools/live_board.py`.
- `C:/Users/kehar/Documents/TFB/Claude/DATABASE/tools/watch_file.py`: plain Python, spends no tokens while waiting, and skips your own lines.
- Older notes on talk files and watchers: `../talk-file-and-watcher/SKILL.md` (history; this SOP is the live route).
