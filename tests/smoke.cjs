"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "ServerAutoTranslateEN.plugin.js"), "utf8");
const consoleSource = fs.readFileSync(path.join(root, "ServerAutoTranslateEN.console.js"), "utf8");

new vm.Script(source, {filename: "ServerAutoTranslateEN.plugin.js"});
new vm.Script(consoleSource, {filename: "ServerAutoTranslateEN.console.js"});

const React = {
  createElement: (type, props, ...children) => ({type, props: props || {}, children}),
  cloneElement: (node, props) => ({...node, props: {...node.props, ...props}}),
};
function BdApi(name) {
  this.Data = {load: () => null, save: () => undefined};
}
BdApi.React = React;
const sandbox = {BdApi, module: {exports: {}}, Intl, console, URLSearchParams};
vm.runInNewContext(source, sandbox, {filename: "ServerAutoTranslateEN.plugin.js", timeout: 2000});
const Plugin = sandbox.module.exports;
const plugin = new Plugin({name: "ServerAutoTranslateEN"});

assert.equal(typeof plugin.start, "function");
assert.equal(typeof plugin.stop, "function");
assert.equal(plugin.settings.targetLang, "en");
assert.equal(plugin.settings.dms, false);
assert.deepEqual(Array.from(plugin.settings.skipLangs), ["en"]);

assert.equal(plugin.allowed({guild_id: "123", isPrivate: () => false}), true);
assert.equal(plugin.allowed({guild_id: null, isPrivate: () => true}), false);
assert.equal(plugin.allowed(undefined), false);

for (const language of ["ru", "ru-RU", "pl", "de", "fr", "zh-CN", "ja"]) {
  assert.equal(plugin.blocked(language), false, language + " should translate");
}
for (const language of ["en", "en-US", "EN-gb", "", "auto", "und"]) {
  assert.equal(plugin.blocked(language), true, language + " should skip");
}

const raw = {type: "span", props: {id: "raw"}, children: ["Привет"]};
const extra = {type: "span", props: {id: "extra"}, children: ["edited"]};
plugin.parser = {parse: value => value};
plugin.langNames = {};
const ui = plugin.render({src:"ru", raw:"Привет", text:"Hello", parsed:null}, raw, [extra]);
assert.strictEqual(ui[0], raw, "Must retain original Discord render without alteration");
assert.strictEqual(ui[1], extra, "Must retain existing extra elements");
assert.equal(ui[2].props.className, "at-translation-line");
assert.equal(ui[2].children[1].children.join(""), " (Translated from Russian)");
assert.match(source, /color:\\s*var\\(--text-muted/);

assert.ok(consoleSource.includes(source), "Console bundle should match BetterDiscord build exactly");
assert.match(source, /translate-pa\\.googleapis\\.com/);
assert.match(source, /translate\\.googleapis\\.com/);

console.log("PASS: syntax, server-only, English skip, Russian translation, source label, unchanged original, console bundle");
