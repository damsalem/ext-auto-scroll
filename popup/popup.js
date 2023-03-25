document.addEventListener("DOMContentLoaded", function () {
    var formParams = document.querySelector("#formParams");
    formParams.addEventListener("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(event.target);
        var delay = formData.get("delay");
        var duration = formData.get("duration");
        console.log(`delay ${delay}, duration ${duration}`);
        chrome.runtime.sendMessage({
            action: "scroll",
            delay: delay,
            duration: duration,
        });
    });

    const durationInput = document.getElementById("duration");
    const durationValue = document.getElementById("duration-value");

    durationInput.addEventListener("input", function () {
        durationValue.textContent = durationInput.value;
    });
});
