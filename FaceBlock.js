
var CountOfBlocked = 0;

var BlockableHyperFeedItems = {
    SponsoredAds: true,
    Memories: true,
    AgoToday: null
};

var BlockedItemCounts = {
    SponsoredAds: 0,
    Memories: 0,
    AgoToday: 0 
};

(function FBObserver(mutationHandler) {
    this.target = document;
    this.options = {
        childList: true,
        subtree: true
    };
    this.observer = null;

    chrome.storage.sync.get(BlockableHyperFeedItems, function (items) {
        BlockableHyperFeedItems.SponsoredAds = items.SponsoredAds;
        BlockableHyperFeedItems.Memories = items.Memories;
        BlockableHyperFeedItems.AgoToday=items.AgoToday
    });

    if (window.MutationObserver && !this.observer)
        this.observer = new MutationObserver(mutationHandler);

    if (this.observer && this.target) {
        try {
            this.observer.observe(this.target, this.options);
        } catch (e) {
            console.log(e);
        }
    }

    document.querySelectorAll("div[id^=hyperfeed_story_id]").forEach(function (n) {
        hideHyperfeedLinks(n);
    });

    chrome.runtime.sendMessage({ "message": CountOfBlocked.toString() });

})(fbMutationHandler);

function fbMutationHandler(mutations) {
    try {
        mutations.forEach(function (MR) {
            //console.log("( mutation: " + MR.target.id + " )");

            if (MR.target.matches("div[id^=hyperfeed_story_id]")) {

                //console.log("( + hyperfeed: " + hs.id + " )");

                hideHyperfeedLinks(MR.target);
            }
        });
    } catch (e) {
        console.log(e);
    }
}

function hideHyperfeedLinks(n) {
    // hide FB hyperfeed nodes containing html "sponsored stories", 
    // aka ads and anything else I don't like
    var arrayOfa = n.querySelectorAll("a[href]");

    arrayOfa.forEach(function (a) {
        if (BlockableHyperFeedItems.SponsoredAds && a.innerText == "Sponsored")
            HideThis(n, "++ hiding ad ->", 1);

        else if (BlockableHyperFeedItems.Memories && a.href.indexOf("onthisday") > -1)
            HideThis(n, "++ hiding memory ->", 2);

        else if (BlockableHyperFeedItems.AgoToday && a.href.indexOf("friendlyatheist") > -1) {
            var ps = n.querySelectorAll("div.userContent > p")
            ps.forEach(function (p) {
                if (p.innerText.indexOf(" ago today") > -1)
                    HideThis(n, "++ hiding ago today ->", 3);
            });
        }
    });
}

function HideThis(n, prompt, type) {
    if (!n.hidden) {
        console.log("( " + prompt + n.id + " )");
        n.hidden = true;
        IncrementBlockedCount(type);
    }
}

function IncrementBlockedCount(item) {
    switch (item) {
        case 1: // SponsoredAds
            BlockedItemCounts.SponsoredAds++;
            break;

        case 2: // Memories
            BlockedItemCounts.Memories++;
            break;

        case 3: // Old stories.
            BlockedItemCounts.AgoToday++;
            break;

        default: 
            break;
    }

    CountOfBlocked = BlockedItemCounts.SponsoredAds +
        BlockedItemCounts.Memories +
        BlockableHyperFeedItems.AgoToday;

    chrome.runtime.sendMessage({ "message": CountOfBlocked.toString() });
}
