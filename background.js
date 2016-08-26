chrome.runtime.onMessage.addListener(function (request, sender, callback) {
    chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 255] });
    chrome.browserAction.setBadgeText({ text: request.message });
    console.log(request);
    return true;
});
