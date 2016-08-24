# FaceBlock

> ##Update 24-Aug-2016
> I created a Chrome Extension but for whatever reason it cannot be Searched for in the Chrome Web Store so here is a direct 
> [link to FaceBlock](https://chrome.google.com/webstore/detail/faceblock/elfjdommhjddccnkaddkmbkmndmgennl) if you'd like to try it.
>
> This repository is the source code for the extension.

---

##FB has placed ads on their main website.  I don't like ads...so....

The folks at AdBlock are in a game of ping-pong with Facebook.
Currently FB has removed all markers that uniquely identify an ad so filtering using CSS rules, IMO, is moot.

This extension is working as of 18-Aug-2016.

This project requires these files to build a Chrome extension:
  * manifest.json
  * FaceBlock.js
  * FaceBlock.jpg
  
The javascript uses the MutationObserver to monitor "mutations" (newly added items) to the FB "wall" looking for ad criteria and, when found, hides the cuplrit.

The code looks for key ad markers but has the ability to hold onto the containing parent, something filter lists cannot do due to the inability of CSS selectors to act on parent items.

It's a start.
This is not a compiled extension but the 2 pieces needed by Chrome to make use of their "Developer Mode" on the extensions page to "Load an unpacked extension"

Copy the files locally and play.

