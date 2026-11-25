---
name: video-generation
description: Generate short videos from text or from a still image through the MuAPI MCP tools, confirming length, model and cost before spending credits.
---

# Video Generation with MuAPI

## Process

1. Confirm the idea, style, aspect ratio, length and whether an input image is supplied. Video costs more than images, so keep the first test short.
2. Use `search_models` to shortlist video models and check their listed parameters, such as duration and resolution.
3. For text to video use `muapi_video_generate`. To animate a still use `muapi_upload_image` and then `muapi_video_from_image`.
4. State the model, prompt, length and expected cost, and wait for approval before the paid call.
5. Poll `muapi_predict_result`; videos take longer than images. Check the result against the brief and report prompt, model and request id.

## Guardrails

Do not submit several paid videos at once or retry a failed paid call automatically. Do not use `muapi_account_topup`, `muapi_keys_create` or `muapi_keys_delete` unless the user asks for that exact action. Do not imply a clip shows a real person or event.
