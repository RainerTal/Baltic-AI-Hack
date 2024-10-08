// chatbot-script.js

const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input button');
const chatbox = document.querySelector(".chatbox");

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    chatLi.innerHTML = `<p>${message}</p>`;
    return chatLi;
};

// Function to send a message to the background script
const sendMessageToBackground = (message) => {
    chrome.runtime.sendMessage({ action: 'fetchTranslation', text: message });
};

// Variable to hold the reference to the "Thinking..." message element
let thinkingMessageLi;

const displayResponse = (translatedText) => {
    // Remove the "Thinking..." message if it exists
    if (thinkingMessageLi) {
        chatbox.removeChild(thinkingMessageLi);
        thinkingMessageLi = null; // Clear the reference
    }

    // Create and append the incoming message with the translated text
    const incomingChatLi = createChatLi(translatedText, "chat-incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
};

// Function to display an error message in the chatbox
const displayError = (error) => {
    const errorChatLi = createChatLi(`An error occurred: ${error}`, "chat-incoming");
    chatbox.appendChild(errorChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
};

const handleChat = () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) {
        return; // Exit if there is no user message
    }

    // Display the user's outgoing message
    chatbox.appendChild(createChatLi(userMessage, "chat-outgoing")); 
    chatbox.scrollTo(0, chatbox.scrollHeight); 

    chatInput.value = ''; // Clear the input field

    // Create and display the "Thinking..." message
    setTimeout(() => {
        thinkingMessageLi = createChatLi("Thinking...", "chat-incoming");
        chatbox.appendChild(thinkingMessageLi);
        chatbox.scrollTo(0, chatbox.scrollHeight); 

        sendMessageToBackground(userMessage); // Send user message to background script
    }, 600);
};

// Add event listener for sending messages
sendChatBtn.addEventListener("click", handleChat);

// Allow sending messages with the Enter key
chatInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        handleChat(); 
    }
});

// Listener for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'displayTranslation') {
        displayResponse(message.text); // Call displayResponse with translated text
    }
});
