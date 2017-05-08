// Saves options to chrome.storage.sync.
var BlockableHyperFeedItems = {
    SponsoredAds: true,
    Memories: false,
    AgoToday: false
};

var DefaultBlockableHyperFeedItems = {
    SponsoredAds: true,
    Memories: false,
    AgoToday: false
};

// Restores checkbox state using the preferences stored in chrome.storage.
function restoreOptions() {
    chrome.storage.sync.get(DefaultBlockableHyperFeedItems, function (items) {
        document.getElementById('cbxSponsoredAds').checked = items.SponsoredAds;
        document.getElementById('cbxMemories').checked = items.Memories;
        document.getElementById('cbxAgoToday').checked = items.AgoToday;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);

document.getElementById('cbxSponsoredAds').addEventListener('click', saveOptions);
document.getElementById('cbxMemories').addEventListener('click', saveOptions);
document.getElementById('cbxAgoToday').addEventListener('click', saveOptions);

function saveOptions() {
    BlockableHyperFeedItems.SponsoredAds = document.getElementById('cbxSponsoredAds').checked;
    BlockableHyperFeedItems.Memories = document.getElementById('cbxMemories').checked;
    BlockableHyperFeedItems.AgoToday = document.getElementById('cbxAgoToday').checked;
    chrome.storage.sync.set(BlockableHyperFeedItems, ReportSaveStatus)
}

function ReportSaveStatus() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Saved.';
    setTimeout(function () {
        status.textContent = '';
    }, 750);
}