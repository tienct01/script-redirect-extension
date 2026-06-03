# Script Redirect Extension

A Chrome extension that redirects matching script and stylesheet requests to a custom host using Declarative Net Request rules.

## What it does

- Adds a popup UI to configure redirect behavior.
- Stores settings in `chrome.storage.sync`.
- Enables/disables redirecting with one button.
- Applies a dynamic rule that redirects matching URLs to your local/dev host.

## Project structure

- `manifest.json` – extension manifest (MV3) and permissions.
- `background.js` – creates/removes dynamic redirect rules.
- `popup.html` / `popup.css` / `popup.js` – popup UI and settings logic.
- `icon.png` – extension icon.

## Install locally (Chrome)

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select your extension folder (this project directory).

## Configuration

From the popup:

- **Folder Regex** (`folder`): base URL pattern to match.
- **Filename Regex** (`file_name`): captured filename/group pattern.
- **Redirect To** (`redirect_to`): destination base URL.

When enabled, the extension creates this redirect pattern:

- Match: `${folder}/(${file_name})`
- Redirect: `${redirect_to}/\1`
- Resource types: `script`, `stylesheet`

Default values used by current logic:

- `folder`: `.*://cdn.shopify.com/extensions/.*/assets`
- `file_name`: `bss.*`
- `redirect_to`: `http://localhost:9002`

## Notes

- Requires host access (`<all_urls>`) to match and redirect requests.
- Dynamic rule ID `1` is reused whenever settings change.
