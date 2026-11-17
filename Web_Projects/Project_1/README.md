# Smart Dost — Chrome Extension

A Manifest V3 productivity toolkit using HTML, CSS and vanilla JavaScript.

## Features
- Quick Notes with automatic local saving
- To-do list with completion and deletion
- Password generator using `crypto.getRandomValues`
- QR code generator (uses a free third-party QR image endpoint; do not submit confidential content)
- Calculator with a restricted arithmetic parser (does not use `eval`)
- Word and character counter with estimated reading time
- Favourite website shortcuts (HTTP/HTTPS only)
- AI prompt library with copy and delete
- Dark/light theme
- Optional clipboard history: user grants `clipboardRead`, then explicitly clicks **Save current clipboard**. It does not monitor clipboard activity.

## Install in Chrome
1. Extract `smart-dost.zip` to a normal folder on your computer.
2. Open Chrome and visit `chrome://extensions`.
3. Turn on **Developer mode** (top-right).
4. Click **Load unpacked**.
5. Select the extracted `smart-dost` folder (the folder containing `manifest.json`).
6. Pin Smart Dost using the puzzle-piece Extensions menu if desired.
7. Click its icon to open the popup. Use the ↗ button for the full dashboard.

## Multiple Chrome windows
Install once in a Chrome profile. Every Chrome window using that same profile shares the same extension installation and `chrome.storage.local` data. Opening another window does not require reinstalling. Separate Chrome profiles have separate extension installations and separate local data. Chrome storage changes are observed by open extension pages so views refresh when data changes.

## Project files
- `manifest.json` — Manifest V3 configuration
- `popup.html/css/js` — toolbar popup
- `dashboard.html/css/js` — full productivity dashboard
- `settings.html/css/js` — theme, backup and reset
- `about.html` — product and privacy information
- `background.js` — service worker and default data initialization
- `common.css` — shared visual styles
- `icons/` — extension icon sizes

## Permissions
- `storage`: required to save data locally and share it across extension pages in one Chrome profile.
- `clipboardRead`: optional; requested only after the user clicks Enable clipboard permission.
- No tabs, history, scripting, activeTab or host permissions are requested.

## Notes
- The QR generator loads an image from `api.qrserver.com`, so QR generation needs an internet connection. This is a free external service, not a paid API or a backend operated by this project.
- Clipboard history is deliberately click-to-save. Browsers/extensions should not silently capture everything copied by the user.
- The project has been source-reviewed for common unsafe patterns; test it in your own Chrome profile before relying on it. No claim of automated Chrome end-to-end testing is made.
