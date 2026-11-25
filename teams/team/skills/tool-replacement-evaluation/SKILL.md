---
name: tool-replacement-evaluation
description: Decide whether to replace an installed CLI tool with a better one.
---

# Evaluating and Replacing a CLI Tool

Decides whether a tool the person depends on should be swapped for a better project, by identifying the incumbent exactly and measuring candidates against the real workload instead of star counts. It covers the comparison, a live test, and the keep-or-swap verdict with its cost. It does not install unrelated software, and it does not switch a working tool without the person's agreement.

## When to Use

- '你可以去 GitHub 寻找比 X 更好用的项目，并且替代他', 'find a better tool and replace this one'.
- A dependency feels stale, slow or limited and the person asks what the alternatives are.
- Choosing between two CLIs or libraries that do the same job.

## Procedure

1. Identify the incumbent precisely: `npm view <package> repository.url homepage description version` (or the ecosystem equivalent) and `<cmd> --version`. Record the real repository; a CLI's own name often points at the wrong GitHub project.
2. Collect candidates from a search about the job, not the tool name, then confirm each candidate's repo with its package metadata or a `web_fetch` of the README. Reject anything that is a service wrapper for another agent rather than a CLI, or that has not shipped in months.
3. Compare on facts you can check quickly in one batch: stars, forks, last commit date, language, and whether it ships a ready adapter for the target site or service. Pull all repos' numbers in one query rather than one search per candidate.
4. Install each serious candidate and run its own setup: `npm install -g <pkg>`, then `<cmd> install` and `<cmd> doctor`. Load whatever browser or runtime it needs.
5. Test on the real workload, not a blank page: open the exact site, account or command the person actually uses. Record success, output shape (structured JSON vs raw page text), latency, and any auth wall. When a headless attempt is refused, retry headed with the user's default profile before rejecting the candidate.
6. Compare the measured results against the incumbent on the same task, then give a one-table verdict — keep, swap, or install alongside — with stars, activity, measured behavior and cost for each row.
7. If the incumbent wins, keep it and say so plainly with the evidence; do not replace a working tool just because the request asked for a replacement. If a candidate wins, name what the switch costs the person (a visible window, slower reads, lost adapter output) and get their agreement before removing the old tool.
8. Clean up: close every test browser session and window opened for the evaluation.

## Pitfalls

- Do not pick by star count alone; a newer repo can only return page text while an older one has a site-specific adapter that returns structured fields.
- Do not bump the incumbent to a newer major version while testing alternatives; an adapter layer may pin the minor line and the upgrade breaks the path that currently works.
- Do not treat a headless 403 as proof a candidate cannot read the site; repeat it headed with a persistent profile first.
- Do not present a swap as free: state the visible-window and latency cost when the alternative is less integrated than the incumbent.
- Do not swap a working tool when the person only asked you to look; give the verdict, let them approve the switch.
- Do not leave evaluation browsers running; close every session you opened.

## Verification

The verdict rests on a side-by-side run of the same real task, both the incumbent's and the tested candidate's versions are stated, and every test session or window opened during the evaluation is closed.
