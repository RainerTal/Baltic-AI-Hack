// script.js

const chatInput = 
    document.querySelector('.chat-input textarea');
const sendChatBtn = 
    document.querySelector('.chat-input button');
const chatbox = document.querySelector(".chatbox");


//OpenAI Free APIKey

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = 
        className === "chat-outgoing" ? `<p>${message}</p>` : `<p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}


const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) {
        return;
    }
    chatbox
    .appendChild(createChatLi(userMessage, "chat-outgoing"));
    chatbox
    .scrollTo(0, chatbox.scrollHeight);

    chatInput.value = '';

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "chat-incoming")
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);

chatInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      handleChat(); 
    }
  });

function cancel() {
    let chatbotcomplete = document.querySelector(".chatBot");
    if (chatbotcomplete.style.display != 'none') {
        chatbotcomplete.style.display = "none";
    }
}

document.getElementById('sendBTN').addEventListener('click', function () {
    const message = document.getElementById('chatMessage').value;

    // Send a message to the background worker
    chrome.runtime.sendMessage({ action: "fetchTranslation", text: message }, function(response) {
        if (response && response.translatedText) {
            console.log(response.translatedText);
            // You can now use the translated text as needed
        } else {
            console.error('Failed to get a response from the background script.');
        }
    });
});
