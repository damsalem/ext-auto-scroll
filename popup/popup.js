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
    });

    toTop.addEventListener("click", function (event) {
        event.preventDefault();
        chrome.runtime.sendMessage({
            action: "toTop",
        });
    });

    const durationInput = document.getElementById("duration");
    const durationValue = document.getElementById("duration-value");

    durationInput.addEventListener("input", function () {
        durationValue.textContent = durationInput.value;
    });
});
