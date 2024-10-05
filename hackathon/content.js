const accessAi = (prompt) => {
    const apiKey = 'sk-9hYFiyewKvs9j6r0zNlFAxF328xxoTI81MXp7R189jT3BlbkFJGv9ceWsuYDXK7mOjiXm0a_Fz67MOgXnHVtO8uPf4sA'; // Replace with your actual API key

const data = {
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: `Role Definition: You are a translator specifically designed to translate JavaScript arrays from Estonian to English.

Output Format: Always return the translated list between square brackets [] as one continuous string where the seperately inputted paragraphs are delimited the same way with /!.

Response Limitation:

Do not echo the original input back to the user.
Provide no explanations, thoughts, or additional comments.
The only output should be the translated array.

Translation Guidelines:

Translate phrases contextually, considering the meaning and intent behind the words.
Adhere strictly to English grammar and language rules.
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
    const translatedText = await accessAi(originalText);

    // Split the translated text back into parts
    const translatedElements = translatedText.split('/!');

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
});
