
var CountOfBlocked = 0;


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

	document.querySelectorAll("div[id^=hyperfeed_story_id]").forEach(function (n) {
		hideSponsoredLink(n);
	});

	chrome.runtime.sendMessage({ "message": CountOfBlocked.toString() });

})(mutationAdHandler);

function mutationAdHandler(mutations) {
	try {
		mutations.forEach(function (MR) {
			//console.log("( mutation: " + MR.target.id + " )");

			if (MR.target.matches("div[id^=hyperfeed_story_id]")) {

				//console.log("( + hyperfeed: " + hs.id + " )");

				hideSponsoredLink(MR.target);
			}
		});
	} catch (e) {
		console.log(e);
	}
}

function hideSponsoredLink(n) {
	// hide nodes containing html sponsored stories, aka ads
	var arrayOfa = n.querySelectorAll("a[href]");

	arrayOfa.forEach(function (a) {
		if (a.innerText == "Sponsored") {
			console.log("( ++ hiding ad ->" + n.id + " )");
			n.hidden = true;
			CountOfBlocked++;
			chrome.runtime.sendMessage({ "message": CountOfBlocked.toString() });
			return true;
		}
	});
}