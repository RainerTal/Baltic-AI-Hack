// content.js

const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input button');
const chatbox = document.querySelector(".chatbox");

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "chat-outgoing" ? `<p>${message}</p>` : `<p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
};

// Function to send a message to the background script
const sendMessageToBackground = (message) => {
    chrome.runtime.sendMessage({ action: 'fetchTranslation', text: message }, (response) => {
        if (response && response.text) {
            displayResponse(response.text);
        } else if (response && response.error) {
            displayError(response.error);
        }
    });
};

// Function to display the response in the chatbox
const displayResponse = (text) => {
    const incomingChatLi = createChatLi(text, "chat-incoming");
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
        return;
    }
    chatbox.appendChild(createChatLi(userMessage, "chat-outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    chatInput.value = '';

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "chat-incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        sendMessageToBackground(userMessage);
    }, 600);
};

sendChatBtn.addEventListener("click", handleChat);

chatInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        handleChat(); 
    }
});