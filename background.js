chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: smoothScroll,
        args: [2000], // Scroll for 2 seconds
    });
});
