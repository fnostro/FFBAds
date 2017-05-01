
var CountOfBlocked = 0;

var BlockableHyperFeedItems = {
	SponsoredAds: true,
	MemoriesOfFriends: true
};

var BlockedItemCounts = {
	Ads: 0,
	Memories: 0
};

(function AdObserver(AdHandler) {
	this.target = document;
	this.options = {
		childList: true,
		subtree: true
	};
	this.observer = null;

	//BlockableHyperFeedItems.FriendsMemories = chrome.storage.sync.get()

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
			HideThis(n, "++ hiding ad ->");
			IncrementBlockedCount(1);
		}

		if (BlockableHyperFeedItems.MemoriesOfFriends && a.href.indexOf("onthisday") > -1) {
			HideThis(n, "++ hiding memory ->");
			IncrementBlockedCount(2)
		}
	});
}

function HideThis(n, prompt) {
	if (!n.hidden) {
		console.log("( " + prompt + n.id + " )");
		n.hidden = true;
	}
}

function IncrementBlockedCount(item) {
	switch (item) {
		case 1: // Ads
			BlockedItemCounts.Ads++;
			break;

		case 2: // Memories
			BlockedItemCounts.Memories++;
			break
	}

	CountOfBlocked = BlockedItemCounts.Ads + BlockedItemCounts.Memories;

	chrome.runtime.sendMessage({ "message": CountOfBlocked.toString() });
}


chrome.storage.onChanged.addListener(function (changes, namespace) {
	for (key in changes) {
		var storageChange = changes[key];
		console.log('Storage key "%s" in namespace "%s" changed. ' +
								'Old value was "%s", new value is "%s".',
								key,
								namespace,
								storageChange.oldValue,
								storageChange.newValue);
	}
});