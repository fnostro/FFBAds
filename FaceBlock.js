(function AdObserver(AdHandler) {
	this.target = document;
	this.options = {
		childList: true,
		subtree: true
	};

	this.observer = null;

	if (window.MutationObserver && !this.observer)
		this.observer = new MutationObserver(AdHandler);

	if (this.observer && this.target) {
		try {
			this.observer.observe(this.target, this.options);
		} catch (e) {
			console.log(e);
		}
	}
})(defaultAdHandler);

function defaultAdHandler(mutations) {
	try {
		mutations.forEach(function (MR) {
			//console.log("( mutation: " + MR.target.id + " )");

			if (MR.target.matches("div[id^=hyperfeed_story_id]")) {

				//console.log("( + hyperfeed: " + hs.id + " )");

				if (MR.target.querySelector("a.uiStreamSponsoredLink")) {
					console.log("( ++ hiding ad ->" + MR.target.id + " )");
					MR.target.hidden = true;
				}
			}
		});
	} catch (e) {
		console.log(e);
	}
}