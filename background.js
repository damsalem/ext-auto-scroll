function scrollDown(speed, delay) {
    delay = delay || 0.75;
    delay = Math.max(delay, 0.75);

    // Calculate the remaining distance to be scrolled
    var remainingDistance =
        document.documentElement.scrollHeight -
        window.innerHeight -
        window.scrollY;
    var incrementFactor = 10;
    var scrollIncrement = remainingDistance / ((11 - speed) * incrementFactor);

    setTimeout(function () {
        var scrolledDistance = 0;
        var scrollInterval = setInterval(function () {
            scrolledDistance += scrollIncrement;
            window.scrollBy(0, scrollIncrement);
            if (scrolledDistance >= remainingDistance) {
                clearInterval(scrollInterval);
            }
        }, 100);
    }, delay * 1000);
}

function toTop() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: function () {
                window.scrollTo(0, 0);
            },
        });
    });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "scroll") {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: scrollDown,
                    args: [message.duration, message.delay],
                });
            }
        );
    } else if (message.action === "toTop") {
        toTop();
    }
});
