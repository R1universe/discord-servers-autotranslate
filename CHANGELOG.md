# Changelog

## 0.3.2-server.3 — 2026-10-28

- Translate **Russian and all other detected non-English languages** into English.
- Skip English and unknown/undetected source languages.
- Keep server-only behavior: never process DMs or group DMs.
- Preserve original Discord messages, showing a separate muted-gray English translation line with a source-language label.
- Publish a matching temporary console test build.
- Add MIT license, installation/privacy documentation, smoke tests and GitHub Actions workflow.

## 0.3.2-server.2 — prototype before repository publication

- Preserved raw Discord message rendering.
- Added gray translation line below original instead of replacing it.
- Excluded Russian and English; **superseded by 0.3.2-server.3**.

## Attribution

Independent modification of Snues' AutoTranslate v0.3.2 (MIT). Not an official upstream release.
