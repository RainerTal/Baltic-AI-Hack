const first = `Role Definition: You are a text simplifier tasked with simplifying content from a web page.

Response Limitation:

Provide only the simplified text.
Do not include explanations, thoughts, or comments.
Avoid any jargon whatsoever in your output.

Output Format: Return only the simplified string.

Simplification Guidelines:

Make the text very easy to understand.
Use very simple words instead of difficult ones.
Keep sentences rather short and clear.
Give only the simplified text, without extra notes or comments.
Do not explain or add any thoughts.

Simplification Style:

Focus on clarity and correctness.
Your sole task is to perform this simplification.`

const second = `Role Definition: You are a text simplifier tasked with simplifying content from a web page.

Response Limitation:

Provide only the simplified text.
Do not include explanations, thoughts, or comments.
Avoid any jargon whatsoever in your output.

Output Format: Return only the simplified string.

Simplification Guidelines:

Simplify the text significantly to enhance accessibility while keeping the basic structure.
Replace uncommon or technical terms with much simpler alternatives, prioritizing everyday language.
Aim for shorter sentences and simpler phrases to ensure easy understanding.
Provide only the simplified text without any identifiers, metadata, or additional comments.
Do not include explanations, thoughts, or comments.

Simplification Style:

Focus on clarity and correctness.
Your sole task is to perform this simplification.`

const third = `Role Definition: You are a text simplifier tasked with simplifying content from a web page.

Response Limitation:

Provide only the simplified text.
Do not include explanations, thoughts, or comments.
Avoid any jargon whatsoever in your output.

Output Format: Return only the simplified string.

Simplification Guidelines:

Make the text more approachable without altering its structure.
Replace uncommon or technical terms with simpler alternatives.
Provide only the simplified text without any identifiers, metadata, or additional comments.
Do not include explanations, thoughts, or comments.

Simplification Style:

Focus on clarity and correctness.
Your sole task is to perform this simplification.`

const simpLevel = {100:first, 75:first, 50:second, 25:second, 0:third}

const simplify = (text, level) =>{
    const apiKey = 'asdasdasd'; // Replace with your actual API key

    const data = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `${simpLevel[level]}`
        },
        {
          role: "user",
          content: `simplify the following to the necessary level of complexity: ${text}`
        }
      ]
    };
    
    return fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Ensure you return the content of the response properly
        return data.choices[0].message.content;
      })
      .catch(error => {
        console.error('Error:', error);
        throw error; // Rethrow the error for further handling if needed
      });
};

const translate = (prompt, language) => {
    const apiKey = 'asdasdasd'; // Replace with your actual API key

const data = {
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: `Role Definition: You are a translator specifically designed to translate the given JavaScript arrays to ${language} .

Output Format: Always return the translated list between square brackets [] as one continuous string where the seperately inputted paragraphs are delimited the same way with /!.

Response Limitation:

Do not echo the original input back to the user.
Provide no explanations, thoughts, or additional comments.
The only output should be the translated array.

Translation Guidelines:

Translate phrases contextually, considering the meaning and intent behind the words.
Adhere strictly to ${language} grammar and language rules.
Maintain the original list structure in the translated output.
Provide only the translated array without any identifiers, metadata, or additional comments.
Do not include explanations, thoughts, or comments.

Translation Style:

Aiming for clarity and correctness.
Task Focus: Your sole purpose is to perform the translation. Avoid any actions or responses beyond this task.
Clean up everything outside the list and just print everything that is between [].`
    },
    {
      role: "user",
      content: prompt
    }
  ]
};

return fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify(data)
})
.then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Ensure you return the content of the response properly
    return data.choices[0].message.content;
  })
  .catch(error => {
    console.error('Error:', error);
    throw error; // Rethrow the error for further handling if needed
  });
};

const utiliseSelection = async (level) => {
    // Step 1: Get the current selection
    let selection = window.getSelection();
  
    if (!selection.rangeCount) {
      console.log("No text selected. Please select some text on the page.");
      return;
    }
  
    // Step 2: Get the range and the selected text
    let range = selection.getRangeAt(0); // First range of selection
    let selectedText = selection.toString(); // Selected text as a string
  
    if (!selectedText) {
      console.log("Please select some text.");
      return;
    }
  
    console.log("Selected text:", selectedText);
  
    // Step 3: Modify the selected text
    // Example: Convert the text to uppercase
    let modifiedText = await simplify(selectedText, level); // Modify as needed
  
    // Step 4: Replace the selected text in the DOM
    range.deleteContents(); // Remove the original selected text
  
    // Insert the modified text back into the same position
    let newNode = document.createTextNode(modifiedText);
    range.insertNode(newNode);
  
    // Clear the selection to avoid confusion
    selection.removeAllRanges();
  
    console.log("Modified text inserted:", modifiedText);
  };

// Function that performs the translation of the entire page
const utiliseEntirePage = async (language) => {
    // Helper function to check if an element is fully visible (including parent visibility)
    const isElementFullyVisible = (el) => {
        // Get the computed style of the element
        const style = window.getComputedStyle(el);

        // Check if the element itself is hidden
        const isVisible = (
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0' &&
            style.height !== '0px' &&
            style.width !== '0px'
        );

        // Ensure the element is in the viewport
        const rect = el.getBoundingClientRect();
        const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        // Check if the element's parent is visible (not hidden or collapsed)
        let parent = el.parentElement;
        while (parent) {
            const parentStyle = window.getComputedStyle(parent);
            if (
                parentStyle.display === 'none' ||
                parentStyle.visibility === 'hidden' ||
                parentStyle.opacity === '0'
            ) {
                return false;
            }
            parent = parent.parentElement;
        }

        return isVisible && isInViewport;
    };

    // Get all visible text nodes in the document
    const getVisibleTextNodes = (element) => {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT, // Only show text nodes
            {
                acceptNode: (node) => {
                    const parentEl = node.parentElement;

                    // Skip elements that are script, style, or other irrelevant tags
                    if (
                        ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parentEl.tagName) ||
                        node.nodeValue.trim().length === 0
                    ) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    // Only accept nodes where the parent is fully visible
                    return isElementFullyVisible(parentEl)
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_REJECT;
                }
            }
        );
        let currentNode;
        while (currentNode = walker.nextNode()) {
            textNodes.push(currentNode);
        }
        return textNodes;
    };

    // Get all visible text nodes from the body
    const textNodes = getVisibleTextNodes(document.body);

    // Extract text content and prepare for translation
    const originalText = textNodes.map(node => node.nodeValue.trim()).join('/!');

    // Simulate the translation API call (replace with your real translation API)
    const translatedText = await translate(originalText, language);

    // Split the translated text back into parts
    let translatedElements = translatedText.split('/!');
    translatedElements[0] = translatedElements[0].substring(1);

    // Remove the last letter of the last element
    translatedElements[translatedElements.length - 1] = translatedElements[translatedElements.length - 1].slice(0, -1);


    // Replace the original text with translated content
    textNodes.forEach((node, index) => {
        node.nodeValue = translatedElements[index] || node.nodeValue;
    });

    console.log("Translation of the entire page completed.");
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received:", request);
    if (request.action === "start-translate") {
        const selectedLanguage = request.language; // Get the language if sent
        utiliseEntirePage(selectedLanguage); // Call your translation function
        sendResponse({ status: "Translation started" });
    }
    else if (request.action === "start-simplify"){
        const level = request.simplificationLevel;
        utiliseSelection(level);
        sendResponse({ status: "Simplification started" });
    }
});

// chatbot

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
    chrome.runtime.sendMessage({ action: 'fetchTranslation', text: message }, response => {
        if (chrome.runtime.lastError) {
            displayError(chrome.runtime.lastError.message);
        } else {
            console.log("Response received from background script:", response);
            displayResponse(response.text); // Call displayResponse with the translated text
        }
    });
};

// Variable to hold the reference to the "Thinking..." message element
let thinkingMessageLi;

// Function to display the response in the chatbox
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