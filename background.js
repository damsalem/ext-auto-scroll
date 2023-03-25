// This worked fairly well!
/* function scrollDown(duration, delay = 0) {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const scrollIncrement = distance / ((duration * 1000) / 10); // divide the total distance by the number of increments

    setTimeout(function () {
        let scrolledDistance = 0;
        const scrollInterval = setInterval(function () {
            scrolledDistance += scrollIncrement;
            window.scrollBy(0, scrollIncrement);
            if (scrolledDistance >= distance) {
                clearInterval(scrollInterval);
            }
        }, 10);
    }, delay * 1000);
} */

function scrollDown(speed, delay = 0) {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const incrementFactor = 100;
    const scrollIncrement = distance / ((11 - speed) * incrementFactor);

    setTimeout(function () {
        let scrolledDistance = 0;
        const scrollInterval = setInterval(function () {
            scrolledDistance += scrollIncrement;
            window.scrollBy(0, scrollIncrement);
            if (scrolledDistance >= distance) {
                clearInterval(scrollInterval);
            }
        }, 100);
    }, delay * 1000);
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
    }
});
