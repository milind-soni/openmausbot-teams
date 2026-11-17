---
name: image-generation
description: Generate or edit images through the MuAPI MCP tools, with the model chosen from search and the prompt approved before spending credits.
---

# Image Generation with MuAPI

## Process

1. Confirm the subject, style, aspect ratio, number of images and, for edits, the source image.
2. Use `search_models` to shortlist models for the job. Check the parameters a model lists before relying on a feature.
3. For a new image use `muapi_image_generate`. For an edit of a supplied image use `muapi_upload_image` and then `muapi_image_edit`.
4. State the model, prompt, count and expected cost, and wait for approval before the first paid call.
5. Poll `muapi_predict_result` until the job finishes. Compare the output with the brief and report prompt, model and request id.

## Guardrails

Do not generate in bulk or retry a failed paid call automatically. Do not use `muapi_account_topup`, `muapi_keys_create` or `muapi_keys_delete` unless the user asks for that exact action. Check `muapi_account_balance` only when the user asks about credits or a call fails for balance.
