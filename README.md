# Voice Work — Clean GitHub Version

This version is a **structural cleanup only**. The page was not run or rendered as part of the cleanup.

## What was cleaned
- Moved all six existing `<style>` blocks into `css/styles.css` **in their original order** so CSS cascade behavior is preserved.
- Extracted the large embedded PNG from the CSS into `assets/images/about-photo.png`, replacing the data URL with a relative asset path.
- Kept all existing inline JavaScript in its original location/order to avoid changing runtime behavior.
- Preserved the existing CSS rules and override layers rather than aggressively deduplicating them.

## Why the CSS was not aggressively deduplicated
The original page intentionally uses later CSS layers and `!important` overrides. Removing rules that look redundant can change the cascade at different breakpoints. This version removes the biggest safe redundancy (embedded asset data) and makes the stylesheet easier to find/edit without changing the cascade.

## Main files
- `index.html` — page structure/content
- `css/styles.css` — all existing CSS, preserved in order
- `assets/images/about-photo.png` — extracted image asset
