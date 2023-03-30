const speeds = [
    "Steady",
    "Moderate",
    "Quick",
    "Nimble",
    "Fast",
    "Rapid",
    "Swift",
    "Blazing",
    "Lightning",
    "Turbo",
];

document.addEventListener("DOMContentLoaded", function () {
    var formParams = document.querySelector("#formParams");
    var toTop = document.querySelector("#toTop");
    formParams.addEventListener("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(event.target);
        var delay = formData.get("delay");
        var speed = formData.get("speed");
        chrome.runtime.sendMessage({
            action: "scroll",
            delay: delay,
            speed: speed,
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

    var speedInput = document.querySelector("#speed");
    var speedValue = document.querySelector("#speed-value");

    speedInput.addEventListener("input", function () {
        const currentSpeed = speeds[speedInput.value - 1];
        console.log(currentSpeed);
        speedValue.textContent = currentSpeed;
    });
});
