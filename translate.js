document.addEventListener('DOMContentLoaded', function () {
    const translateButton = document.querySelector('.execute-button');
    if (translateButton) {
        translateButton.addEventListener('click', function () {
            // Get the selected language from the dropdown
            const languageSelect = document.getElementById('language-select');
            if (languageSelect) {
                const selectedLanguage = languageSelect.value;

                // Send a message to the content script to perform the translation
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "translatePage",
                        language: selectedLanguage
                    }, function (response) {
                        if (chrome.runtime.lastError) {
                            console.error("Error sending message:", chrome.runtime.lastError.message);
                        } else {
                            console.log("Response from content script:", response);
                        }
                    });
                });
            } else {
                console.error("Language select element not found.");
            }
        });
    } else {
        console.error("Translate button not found.");
    }
});
