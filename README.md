# Discord Server AutoTranslate EN

Experimental BetterDiscord plugin for **Discord Canary** (macOS and other desktop platforms).

**Original first, English translation underneath.** Every visible eligible server message detected as non-English (including Russian) may show a muted-gray translation with an English source-language label. English messages are left as-is.

> Based on [AutoTranslate v0.3.2 by Snues](https://github.com/Snusene/BetterDiscordPlugins/tree/main/AutoTranslate), used and modified under the MIT license. This is an independent, unofficial adaptation; it is **not** an official Snues release.

## Appearance

```text
7:50  SXnjamej
Gdzie
Where (Translated from Polish)

7:51  User
Привет, как дела?
Hello, how are you? (Translated from Russian)

7:52  User
See you later!
```

The original Discord-rendered content is retained; the translation appears in a separate line colored with Discord's muted text variable. No hover is needed.

## Behavior

- **Translate to English** from Russian, Polish, German, Chinese and other Google-supported languages.
- **Do not translate English.** Unknown/undetected languages also leave no translation line.
- **Server channels only**; neither DMs nor group DMs are processed.
- Only **visible messages** are translated; this does not crawl all server history.
- As inherited from the original implementation, **your own messages**, bot messages and some webhook/system message types are skipped.
- Original messages are never edited or sent back to Discord; translations change **only the local visual presentation**.
- Some short, ambiguous, emoji-only or noise-like messages are deliberately skipped. Automatic language identification can be wrong.
- Discord Canary frequently changes internal modules, so this build may break after an update.

## Install (BetterDiscord)

1. Install [BetterDiscord](https://betterdiscord.app/) in your Discord Canary client.
2. Disable Snues' **AutoTranslate** or any earlier **ServerAutoTranslateEN** variant to avoid conflicting render patches.
3. Open **User Settings → BetterDiscord → Plugins → Open Plugins Folder**.
4. Save [`ServerAutoTranslateEN.plugin.js`](./ServerAutoTranslateEN.plugin.js) into this directory. Keep the exact `.plugin.js` extension.
5. Enable **ServerAutoTranslateEN** in the plugin list. Test in a server channel with known Russian and English messages.

### Temporary console test

With both installed AutoTranslate variants **disabled**, open Canary Developer Tools and paste the full contents of [`ServerAutoTranslateEN.console.js`](./ServerAutoTranslateEN.console.js) into the console. To stop the test:

```js
window.__serverAutoTranslateTest?.stop()
```

The console edition requires BetterDiscord's `BdApi` and does not remain installed after a full app restart.

## Translation providers & privacy

The code uses Google Translate's **unofficial** endpoints, initially `translate-pa.googleapis.com/v1/translateHtml` and then `translate.googleapis.com/translate_a/t` as a fallback. Google receives the text for translation and source-language detection **even when a message ultimately gets skipped for being English**. This is not an offline or confidential translation solution.

No Discord token is intentionally extracted, but all BetterDiscord plugins run inside your account's client; review the code before enabling it. Unofficial client modifications can violate Discord's rules and carry account risk. Rate limiting and service changes can disrupt translations.

## Development

```sh
node --check ServerAutoTranslateEN.plugin.js
node --check ServerAutoTranslateEN.console.js
node tests/smoke.cjs
```

Update both JavaScript distributions together and increment `@version`. This repo currently uses **manual upgrades**: download the latest `.plugin.js` and replace the old file. The source and changes are public.

## Credits and license

- Original plugin: **Snues**, AutoTranslate v0.3.2.
- This adaptation: R1universe.
- [MIT license](./LICENSE) retains the original copyright and permission notice.
