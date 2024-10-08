// Function to securely retrieve the token
const getAuthToken = () => {
    // Retrieve the token from a secure storage or environment variable
    return 'asdasdasdasd';
};

// Function to create headers
const createHeaders = () => {
    const authToken = getAuthToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
    };
};

// Function to make an API call using the headers
const makeApiCall = async (url, payload) => {
    const headers = createHeaders();
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });

        // Log the response status for debugging
        console.log(`Response Status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log('API Response Data:', data); // Log the entire response data for debugging

        const translatedText = data.choices[0].message.content.trim();
        console.log('Extracted GPT response:', translatedText); // Log the extracted translated text

        return translatedText;
    } catch (error) {
        console.error('Error making API call:', error);
        throw error;
    }
};

// Listener for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetchTranslation") {
        const url = "https://api.openai.com/v1/chat/completions";
        const systemMessages = {
            role: "system",
            content: `
            Your name is AccessAI and you are a web question and accessibility helpbot.

            Role Definition: Understand and Simplify

            - Answer user questions in clear, easy-to-understand English.
            - Simplify and clarify complex concepts to make them more accessible.
            - Accessibility First

            Structure responses for easy reading.
            - Use simple language, short sentences, and provide step-by-step instructions.
            - Ensure responses are grammatically correct.
            - Address User's Intent

            Clarify unclear or illogical questions by offering suggestions to refine them.
            - Offer help with what the user may be trying to ask.
            - Provide Direct Assistance

            Be concise, direct, and relevant in your responses.
            - Offer solutions or guidance with clear examples when appropriate.
            - Respect WCAG Guidelines

            Ensure responses are easy to perceive and understand.
            - Use descriptive links when referring to additional resources.
            - Use clear terms and consider cognitive and learning needs by minimizing complexity.
            - Focus on User's Questions`
        };

        const userMessage = {
            role: "user",
            content: message.text
        };

        const payload = {
            model: "gpt-4o-mini",
            messages: [systemMessages, userMessage],
            max_tokens: 40,
            temperature: 0.7,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0
        };

        makeApiCall(url, payload)
            .then(translatedText => {
                console.log('Sending back response:', translatedText);
                sendResponse({ text: translatedText }); // Respond with the translated text
            })
            .catch(error => {
                sendResponse({ error: error.message });
            });

        // Return true to indicate that the response will be sent asynchronously
        return true;
    }
});
