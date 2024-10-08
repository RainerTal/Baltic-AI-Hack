document.querySelector('.execute-button').addEventListener('click', () => {
    // Get the currently selected language from the dropdown
    const selectedLanguage = document.querySelector('#language-select').value;
    
    // Query the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Send a message to the content script with the action and selected language
        chrome.tabs.sendMessage(tabs[0].id, { 
            action: "start-translate",
            language: selectedLanguage // Transmit the selected language
        });
    });
});