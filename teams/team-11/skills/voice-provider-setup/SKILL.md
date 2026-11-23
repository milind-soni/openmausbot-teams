---
name: voice-provider-setup
description: Connect speech-to-text, text-to-speech, and live call providers.
---

# Voice and Call Provider Setup

Configures how the bot hears (ASR), speaks (TTS), and holds a live call, and explains which provider keys can serve which of those roles. It does not change the chat model: voice keys and chat model keys are separate settings, even when the same vendor issues both.

## When to Use

- "How do I connect my <vendor> key to the voice / call service?"
- "Realtime call is not working / says it needs an address and key."
- "Which voice should the bot answer with?"
- "Can I just talk to you instead of typing / are you listening?"
- "What is that button next to the mic / can I call you with this?"
- A user asks whether a chat-model vendor can also power realtime calls.

## Procedure

1. Read the current voice settings before answering. Find the call-mode list, the speech provider fields (TTS and ASR), the selected voice, and whether a key already shows as saved. Do not tell the user to re-enter a key that is already stored.
2. If the key is missing, open the secure-card prompt for the provider's key field (Settings → AI → Other services on the host) and tell the user to paste it there themselves; never ask for the key in chat. After they save, re-read the settings to confirm the key registered before saying it is set up.
3. Separate the two call modes in your answer, because they accept different provider sets:
   - Turn-based (press to talk): needs only batch ASR plus TTS. Most vendors can serve this.
   - Realtime (full duplex, interruptible): needs a streaming audio protocol from a vendor that offers one (OpenAI realtime, Azure OpenAI, Gemini Live, ElevenLabs, Fish Audio, or a custom endpoint speaking the same protocol).
4. Check the vendor's own API docs (web search + docs page) for what the key actually unlocks: a `/tools/tts` plus `/tools/asr` batch pair is not a realtime interface and cannot be pointed at a realtime call even with a valid key.
5. If a vendor is batch-only, give the working path instead of a refusal: switch the call mode to turn-based, pick the vendor as speech provider, select a voice, and confirm reading replies, dictation, and turn-based calls all use it.
6. Only when a realtime-compatible provider is genuinely available, fill the realtime endpoint fields: base URL, model name, key. Leave the base URL at the segment the app appends to, not the full request path, when the app auto-appends the protocol suffix (same rule as custom decision-model endpoints).
7. For any realtime slot that is selected but empty, say so plainly: an empty custom endpoint makes the call fail on a missing address and key, and name which provider class fixes it.
8. Before telling the user whether they can speak to the bot directly, check the host's recording devices and report which input is enabled or missing. Then explain the three ways in and keep the first two distinct: the mic button next to the input box starts dictation (tap again to stop), the talk-shortcut setting lets one key start recording, and the phone-icon call button next to the mic opens a live call rather than dictation. State the per-recording cap when the provider has one (about two minutes on DeepSeek) and offer to switch the shortcut on rather than making them hunt for it.
9. When asked about the call button, place one short test call, note which call mode it actually opens in, then hang up before replying. Name the keybindings of that mode so the user can use it unaided: in turn-based mode hold Ctrl+Alt to talk, release and wait for the answer, Space interrupts, Esc hangs up.

## Pitfalls

- Do not conflate chat model, decision model, and voice provider settings; a key saved under one does nothing for the others. State explicitly which part of the app the key touches and that the chat model is unaffected.
- Do not promise realtime from a vendor that only publishes batch TTS/ASR; verify the protocol before answering, because the user will otherwise buy a key that cannot be used.
- Do not read "key saved" as "call works": check the selected call mode and that the provider's endpoint fields are filled.
- Do not treat a spoken reply as evidence the bot can hear the user; TTS out and ASR in are separate channels. When asked what it is listening to, say the mic is closed until dictation starts and that it hears no ambient audio.
- Do not answer "can I talk to you without a microphone" from assumption; inspect the input devices first, because a disabled or unplugged mic changes the answer and the fix is enabling the device or using the talk shortcut.
- Do not describe the phone-icon button as dictation or merge it with the mic button; they start different features, and a call does not mean the mic stays open afterwards — say the call was hung up.
- Report vendor quotas and pricing as of now, not from blog posts: free tiers get withdrawn and older limits float around for years. Websearch first, then the vendor's own pricing page, and flag stale third-party numbers.

## Verification

Confirm the settings page shows the chosen call mode, provider, voice, and a saved key, then make one real test: send a short reply in the selected voice so the user hears it, and take one short dictation or test call. Report what the provider actually returned, not just that the fields were saved.
