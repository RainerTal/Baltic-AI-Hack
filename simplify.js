document.querySelector('.execute-button').addEventListener('click', () => {
    // Get the current simplification level from the slider
    const simplificationLevel = document.querySelector('#myRange').value;
    
    // Query the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Send a message to the content script with the action and simplification level
        chrome.tabs.sendMessage(tabs[0].id, { 
            action: "start-simplify",
            simplificationLevel: simplificationLevel // Transmit the simplification level
        });
    });
});