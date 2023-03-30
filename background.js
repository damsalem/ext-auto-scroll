function scrollDown(speed, delay) {
    delay = delay || 0.75;
    delay = Math.max(delay, 0.75);
    var distance = document.documentElement.scrollHeight;
    var incrementFactor = 100;
    var scrollIncrement = distance / ((11 - speed) * incrementFactor);

    // Scroll to top of page
    window.scrollTo(0, 0);

    setTimeout(function () {
        var scrolledDistance = 0;
        var scrollInterval = setInterval(function () {
            scrolledDistance += scrollIncrement;
            window.scrollBy(0, scrollIncrement);
            if (scrolledDistance >= distance) {
                clearInterval(scrollInterval);
            }
        }, 100);
    }, delay * 1000);
}

function scrollDown(speed, delay) {
    // Set default delay to 0.75 seconds
    delay = delay || 0.75;
    // Set minimum delay to 0.75 seconds
    delay = Math.max(delay, 0.75);

    // Calculate duration based on speed
    var duration = (11 - speed) * 50000; // calculate duration in milliseconds

    // Calculate distance to scroll to bottom of page
    var distanceToScroll =
        document.documentElement.scrollHeight - window.innerHeight;

    // Scroll to top of page first, then start scrolling down
    window.scrollTo(0, 0);

    setTimeout(function () {
        var startTime = performance.now();
        var scrollInterval = setInterval(function () {
            var timeElapsed = performance.now() - startTime;
            var progress = Math.min(timeElapsed / duration, 1);
            var scrollDistance = distanceToScroll * progress;

            // Scroll by distance, but never more than distanceToScroll
            window.scrollBy(0, Math.min(scrollDistance, distanceToScroll));

            // Check if reached the bottom of the page
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight
            ) {
                clearInterval(scrollInterval);
            }
        }, 16); // run at 60 FPS
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
                    args: [message.speed, message.delay],
                });
            }
        );
    } else if (message.action === "toTop") {
        toTop();
    }
});
