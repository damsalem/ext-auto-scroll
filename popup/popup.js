var speeds = [
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

// Buttons and inputs
var toTop = document.querySelector("#toTop");
var formParams = document.querySelector("#formParams");
var delayInput = document.querySelector("#delay");
var speedInput = document.querySelector("#speed");
var speedValue = document.querySelector("#speed-value");

document.addEventListener("DOMContentLoaded", async function () {
    var keys = await chrome.storage.sync.get(["delay", "speed"]);
    delayInput.value = keys.delay ? keys.delay : 0;
    speedInput.value = keys.speed ? keys.speed : 1;

    handleSpeedText();
});

formParams.addEventListener("change", function (event) {
    var delayValue = delayInput.value;
    var speedValue = speedInput.value;

    // Set to values to state
    chrome.storage.sync.set({ delay: delayValue, speed: speedValue });
});

formParams.addEventListener("submit", function (event) {
    event.preventDefault();

    // Send message to background
    chrome.runtime.sendMessage({
        action: "scroll",
        delay: delayValue,
        speed: speedValue,
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

speedInput.addEventListener("input", handleSpeedText);

function handleSpeedText() {
    var currentSpeed = speeds[speedInput.value - 1];
    speedValue.textContent = currentSpeed;
}
