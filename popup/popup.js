document.addEventListener("DOMContentLoaded", function () {
    var formParams = document.querySelector("#formParams");
    var toTop = document.querySelector("#toTop");
    formParams.addEventListener("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(event.target);
        var delay = formData.get("delay");
        var duration = formData.get("duration");
        chrome.runtime.sendMessage({
            action: "scroll",
            delay: delay,
            duration: duration,
        });
        // Close window after a delay
        setTimeout(function () {
            window.close();
        }, 500);
    });

    toTop.addEventListener("click", function (event) {
        event.preventDefault();
        chrome.runtime.sendMessage({
            action: "toTop",
        });
    });

    chrome.runtime.lastError && console.error(chrome.runtime.lastError);

    var durationInput = document.querySelector("#duration");
    var durationValue = document.querySelector("#duration-value");

    durationInput.addEventListener("input", function () {
        durationValue.textContent = durationInput.value;
    });
});
