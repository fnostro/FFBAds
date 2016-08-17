(function () {
	var observer;
	var target = document.querySelector("div[id^='feed_stream'");
	var options = {
		childList : true,
		subtree : true
	};

	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	if (MutationObserver && !observer) {
		observer = new MutationObserver(function (mutations) {
				try {
					mutations.forEach(function (MR) {
						//console.log("( mutation: " + MR.target.id + " )");

						if (MR.target.matches("div[id^=hyperfeed_story_id]")) {
							var hs = MR.target;

							//console.log("( + hyperfeed: " + hs.id + " )");

							var child_ad = hs.querySelector("a.uiStreamSponsoredLink");
							if (child_ad) {
								console.log("( ++ ad found: hiding ->" + hs.id + " )");
								hs.hidden = true;
							}
						}
					});
				} catch (e) {
					console.log(e);
				}

			});
		try {
			if (target)
				observer.observe(target, options);
		} catch (e) {
			console.log(e);
		}
	}

})();
