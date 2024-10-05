// Function to request translation from background
const requestToAi = (originalText) => {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "fetchTranslation", text: originalText }, (response) => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError));
            } else {
                resolve(response.translatedText);
            }
        });
    });
};

// Function that performs the translation of the entire page
const utiliseEntirePage = async (language) => {
    let elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, p'));
    let originalText = '[' + elements.map(el => el.textContent).toString() + ']'; // Join with your custom delimiter

    console.log("Translating next");
    
    try {
        // Wait for the translation response
        let translatedText = await requestToAi(originalText);
        console.log("Translated text received:", translatedText);

        let translatedElements = translatedText.split(' /!/ ');

        elements.forEach((el, index) => {
            let translatedContent = translatedElements[index] || originalText[index]; // Fallback to original text if no translation
            
            let textNodes = Array.from(el.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);

            if (textNodes.length > 0) {
                console.log(`Original text: "${textNodes[0].nodeValue}", Translated to: "${translatedContent}"`);
                textNodes[0].nodeValue = translatedContent;
                console.log(`Updated element: "${el.tagName}" with translated text.`);
            }
        });

        console.log("Translation of the entire page completed.");
    } catch (error) {
        console.error("Error during translation:", error);
    }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received:", request);
    if (request.action === "start-translate") {
        const selectedLanguage = request.language; // Get the language if sent
        utiliseEntirePage(selectedLanguage); // Call your translation function
        sendResponse({ status: "Translation started" });
    }
});
