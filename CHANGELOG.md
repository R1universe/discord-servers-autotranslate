# Changelog

## 0.3.2-server.4 — 2026-10-28

- Use language-neutral descriptions in documentation, source comments, settings and console output.
- Keep automatic detection and translation of supported non-English messages into English unchanged.
- Correct the GitHub source URL, synchronize console/plugin metadata and repair the smoke tests.

## 0.3.2-server.3 — 2026-10-28

- Translate **recognized non-English source languages** into English.
- Skip English and unknown/undetected source languages.
- Keep server-only behavior: never process DMs or group DMs.
- Preserve original Discord messages, showing a separate muted-gray English translation line with a source-language label.
- Publish a matching temporary console test build.
- Add MIT license, installation/privacy documentation, smoke tests and GitHub Actions workflow.

## 0.3.2-server.2 — prototype before repository publication

- Preserved raw Discord message rendering.
- Added gray translation line below original instead of replacing it.
- Had narrower source-language exclusions; **superseded by 0.3.2-server.3**.

## Attribution

Independent modification of Snues' AutoTranslate v0.3.2 (MIT). Not an official upstream release.
