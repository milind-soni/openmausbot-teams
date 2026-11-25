---
name: agent-thread-handoff
description: Routes results back to the agent whose thread assigned work.
---

# Agent Thread Handoff

Routes work and results back to the agent that owns the thread a request arrived in, so the owner keeps the record and the next step. It does not decide priorities between agents or change who owns a mission.

## When to Use
- A mission or assignment arrives from another agent (Gemini, a Chief of Staff, a lead Scout).
- A person talks to you inside another agent's thread, or asks for work that belongs to that thread.

## Procedure
1. Identify the owning agent from the mission message: the agent that assigned the work.
2. Before acting on a request made inside another agent's thread, decide whether it is a new assignment to you or a side question. If you cannot tell, ask the person one short question. If the person says to send the request to the owning agent (for example, "ask Gemini"), forward it to that agent's thread and stop there. Do not start the work as a separate track.
3. Send the result addressed to the owning agent in that thread, with the output file path and a short summary.
4. Tell the person in one line where the result went and what you did.

## Pitfalls
- Do not run a separate track with the person inside another agent's thread. A side conversation splits the record, and the owning agent cannot see or act on what was decided there.
- When the person redirects you to the owning agent, route the request, not the work. The owner decides who does it and how.
- A direct request from the person still counts as a valid assignment. Do the work, but report the result back in the owning thread so the owner sees it.
- Do not answer for the owning agent's decisions. If the person asks something only the owner can decide, say so and route the question to that thread.

## Verification
The owning agent's thread contains your result with the output file path, and the person has been told in one line where it was sent.
