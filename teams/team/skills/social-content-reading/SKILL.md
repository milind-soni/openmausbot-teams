---
name: social-content-reading
description: Read public social posts when platform API is blocked.
---

# Reading Public Social Content Without API Access

Reads public profiles, posts, threads and keyword search results from social platforms (X/Twitter first) through a read-only scraping channel when the official API or a connected Composio toolkit cannot read. It complements the imported `agent-reach` skill — that one covers the channel catalogue and login policy, this one is the X-reading fallback. It never posts, likes, follows or logs in for the user, and it cannot see a logged-in home timeline or likes.

## When to Use

- '你读取X数据的时候可以用抓取网页的形式', '用 agent-reach 读一下', '读一下这个推文/这个账号'.
- A connected toolkit read fails with a quota or credits error and the person still wants the public content.
- Any request to read a public X/Twitter profile, post, thread or keyword search when the API path is exhausted.

## Procedure

1. Run agent-reach on the machine that has it. It is installed on the person's own Windows computer, not inside the private desktop VM; after any VM work switch back with `mcp__agents__select_computer` and prove it with `hostname`.
2. Check the channel before reading: `agent-reach doctor --text`, then `agent-reach channels` to list channel usage.
3. If the twitter channel is missing, add it with `agent-reach add twitter --allow-upgrade`. The upgrade flag matters: the bundled opencli must meet the channel's minimum version. If the sandbox denies the write, re-run the identical command once with full access and expect one approval prompt per scrape afterwards.
4. Pin the bundled component before considering an upgrade: the channel's adapter may support only a minor line (opencli 1.8.x), so a newer major version can break the working path. Check the installed version and the channel's stated support, and keep the working version rather than chasing the latest release.
5. Read with the commands verified in this setup: `agent-reach twitter profile <handle>` and `agent-reach twitter tweets <handle> --limit 5`. The channel also covers keyword search and a single post with its replies; take their exact syntax from the usage printed by `agent-reach channels`, do not invent flags.
6. Browser fallback only when the channel cannot run at all: `npm install -g agent-browser`, then `agent-browser install` and `agent-browser doctor`, then open the profile with a headed persistent profile: `agent-browser --session <name> --headed --profile Default open "<url>"`. Read the result with `agent-browser --session <name> read` or `agent-browser --session <name> eval "JSON.stringify({articles: document.querySelectorAll('article').length, loginWall: /Log in|登录/.test(document.body.innerText)})"`. Expect raw page text instead of structured fields and 5-10 seconds per read; a headless session gets 403 from X, so the visible window is what makes it work.
7. Report what the channel returned and name the parts that stay unreachable: the home timeline and likes need a logged-in session. If the person wants those, open the provider's login window and let them type the password; never type it for them.
8. Save the working setup to memory in the same turn: channel installed, commands that worked, public-only limit.

## Pitfalls

- Do not call the tool missing because a check failed inside the VM; agent-reach lives on the host, so switch machine and check again before touching browser scraping.
- Do not fall back to raw `curl` fetches or a headless browser first; the channel already handles rendering, rate limits and login walls, and raw fetches return blocked or empty pages. When only the browser route is left, a headed window with the user's default profile renders content that a headless session gets 403 on.
- Do not read a failing platform subcommand as a missing channel; use the error to fix the add/upgrade step and retry.
- Only public data is readable: never promise a timeline, likes or DMs, and never ask the person for their password.
- The person may name the tool to use ('就用 agent-reach'); follow that choice instead of proposing an alternative route.
- Do not upgrade the bundled opencli component just because a newer release exists; the channel adapter can pin the minor line and the upgrade silently breaks the reads that worked.
- When the person asks for a better tool to replace the channel, test each candidate on the real profile page and keep the channel if it still wins on speed and structured output — see `tool-replacement-evaluation` for the comparison procedure.
- Close every browser session opened during a fallback or an evaluation; leave no test windows behind.

## Verification

`agent-reach doctor --text` shows the twitter channel healthy, and one read against a real handle named by the person returns profile fields or post text rather than an error or an empty list.
