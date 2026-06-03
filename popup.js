document.addEventListener("DOMContentLoaded", function () {
    renderHeading();
    renderData();
    initSaveBtnEvent();
    initEnableBtnEvent();
});

function renderHeading() {
    const text = "TECH ARMS EXTENSION";
    const colors = ["red", "blue", "green", "orange", "purple", "teal", "brown", "pink", "white"];
    const heading = document.getElementById("heading");

    text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = char;
        span.style.color = colors[index % colors.length];
        heading.appendChild(span);
    });
}

function initSaveBtnEvent() {
    const message = document.getElementsByClassName("message")[0];
    const saveBtn = document.getElementById("save-btn");
    const inputFolder = document.querySelector("input[name='folder']");
    const inputRedirectTo = document.querySelector("input[name='redirect_to']");
    const inputFileName = document.querySelector("input[name='file_name']");
    saveBtn.addEventListener("click", function () {
        chrome.storage.sync.set({
            folder: inputFolder.value,
            redirect_to: inputRedirectTo.value,
            file_name: inputFileName.value,
        });
        message.textContent = "Save successfully!!!";
        setTimeout(() => {
            message.textContent = "";
        }, 500);
    });
}

function renderData() {
    const enableBtn = document.getElementById("enable-btn");
    const inputFolder = document.querySelector("input[name='folder']");
    const inputRedirectTo = document.querySelector("input[name='redirect_to']");
    const inputFileName = document.querySelector("input[name='file_name']");

    chrome.storage.sync.get(
        ["redirectEnabled", "folder", "redirect_to", "file_name"],
        function (data) {
            inputFolder.value = data.pattern || ".*://cdn.shopify.com/extensions/.*/assets";
            inputFileName.value = data.file_name || "bss.*";
            inputRedirectTo.value = data.redirect_to || "http://localhost:9002";
            enableBtn.textContent = data.redirectEnabled ? "Disable" : "Enable";
            if (data.redirectEnabled) {
                enableBtn.style.backgroundColor = "#a05";
            } else {
                enableBtn.style.backgroundColor = "#0a5";
            }
        }
    );
}

function initEnableBtnEvent() {
    const enableBtn = document.getElementById("enable-btn");
    const inputFolder = document.querySelector("input[name='folder']");
    const inputRedirectTo = document.querySelector("input[name='redirect_to']");
    const inputFileName = document.querySelector("input[name='file_name']");

    enableBtn.addEventListener("click", function () {
        chrome.storage.sync.get(["redirectEnabled"], function (data) {
            const newState = !data.redirectEnabled;
            chrome.storage.sync.set(
                {
                    redirectEnabled: newState,
                    folder: inputFolder.value,
                    redirect_to: inputRedirectTo.value,
                    file_name: inputFileName.value,
                },
                function () {
                    enableBtn.textContent = newState ? "Disable" : "Enable";
                    if (newState) {
                        enableBtn.style.backgroundColor = "#a05";
                    } else {
                        enableBtn.style.backgroundColor = "#0a5";
                    }
                }
            );
        });
    });
}
