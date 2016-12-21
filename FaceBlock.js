
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

	if (nl = document.querySelectorAll("a.uiStreamSponsoredLink")) {
		nl.forEach(function (n) {
			ParentHyperFeedStoryContainerOf(n);
		});
	}
})(defaultAdHandler);

function defaultAdHandler(mutations) {
	try {
		mutations.forEach(function (MR) {
			//console.log("( mutation: " + MR.target.id + " )");

			if (MR.target.matches("div[id^=hyperfeed_story_id]")) {

				//console.log("( + hyperfeed: " + hs.id + " )");

				if (MR.target.querySelector("a.uiStreamSponsoredLink")) {
					hideSponsoredContainer(MR.target);
				}
			}
		});
	} catch (e) {
		console.log(e);
	}
}

function ParentHyperFeedStoryContainerOf(n) {

	if (n.matches("div[id^=hyperfeed_story_id]")) {
		if (!n.hidden)
			hideSponsoredContainer(n);
	}
	else if (n.tagName == "BODY")
		return null;

	else
		ParentHyperFeedStoryContainerOf(n.parentNode);
}

//function isHidden(e) {
//	return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
//}

function hideSponsoredContainer(n) {
	console.log("( ++ hiding ad ->" + n.id + " )");
	n.hidden = true;
	CountOfBlocked++;
	chrome.runtime.sendMessage({ "message": CountOfBlocked.toString() });
}