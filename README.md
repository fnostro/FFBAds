# FaceBlock 
[Link to Store (version 20.17.5.8)](https://chrome.google.com/webstore/detail/faceblock/elfjdommhjddccnkaddkmbkmndmgennl)

>##Update 08-May-2017
> <p>So, a few additions.</p>
> <ul>
> <li>Added ability to block Friends "Memories".  This seems to be a subset of FB's "On This Day" but without the ability to disable it</li>
> <li>Added ability to block user content that contains the string " ago today".  This one is mostly for me.  I follow a page that posts "memory" like older, historical items that I don't wish to see so...</li>
> <li>Added ability to enable/disable these new options and to save/restore these settings.</li>
> </ul>


>##Update 28-Dec-2016 15:43
><p>Facebook, in another move to annoy me, removed an identifying classname: uiStreamSponsoredLink...so here is the work around</p>
><p>Published to Chrome Store today (2016-12-28) but it takes about an hour to appear. <br>Make sure the version is 20.16.12.28 </p>
>[Link to Store (version 20.16.12.28)](https://chrome.google.com/webstore/detail/faceblock/elfjdommhjddccnkaddkmbkmndmgennl)


>##Update 21-Dec-2016 17:21
><p>OK that stupid initial sponsored link got to annoyance level. Fixed.</p>
><p>Will place in Chrome store asap</p>


>##Update 19-Sep-2016
><p>I am aware that occasionally an ad will make it's way into the newsfeed.  As far as I can see there is no change to the FB html markup used in the newsstory feed.  For myself, it seems to happen when I view FB, then switch tabs and then switch back sometime later. </p>
><p>I ususally just do a forced refresh (Ctrl-F5) to clear it up.  This is very sporadic and I'm ok issuing a refresh so I'm not going to spend time researching this further as it has not yet gotten to "Annoyance" level for me.</p>


> ##Update 26-Aug-2016
> + Removed uneeded permissions
> + Added a badge to show count of blocked ads


> ##Update 25-Aug-2016
> The extension is now serachable from the web store, yay.


> ##Update 24-Aug-2016
> I created a Chrome Extension but for whatever reason it cannot be Searched for in the Chrome Web Store so here is a direct 
> [link to FaceBlock in the Chrome Web Store](https://chrome.google.com/webstore/detail/faceblock/elfjdommhjddccnkaddkmbkmndmgennl) if you'd like to try it.
>
> Also, turns out there are a number of extensions named FaceBlock.  I should have searched before naming this extension. 
> But apparently duplicated extension names are allowed so...
>
> This repository is the source code for the extension.

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

