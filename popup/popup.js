function smoothScroll(duration) {
    const start = window.pageYOffset;
    const end = document.body.scrollHeight - window.innerHeight;
    const distance = end - start;
    let startTime = null;

    function scrollAnimation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scrollAmount = easeInOutQuad(
            timeElapsed,
            start,
            distance,
            duration
        );
        window.scrollTo(0, scrollAmount);
        if (timeElapsed < duration) requestAnimationFrame(scrollAnimation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(scrollAnimation);
}

document.addEventListener("DOMContentLoaded", () => {
    const scrollButton = document.getElementById("scrollButton");
    scrollButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: smoothScroll,
                args: [2000], // Scroll for 2 seconds
            });
        });
    });
});
