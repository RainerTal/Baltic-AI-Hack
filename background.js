// background.js

// Function to securely retrieve the token
const getAuthToken = () => {
    // Retrieve the token from a secure storage or environment variable
    return 'eyJraWQiOiIyMDI0MTAwMjA4NDIiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJBYmlQWEVsakNWLWU4OWZlODYxLTQ0OGYtNDkyMS1iNDhkLWE1ZDBhOWZlZTQzYiIsImlkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJyZWFsbWlkIjoiQWJpUFhFbGpDViIsImp0aSI6ImI4ZjA3MDk2LWY3MTUtNDUwMy1hZmEyLTk2NmI4Zjg1ZDEzNSIsImlkZW50aWZpZXIiOiJlODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20iLCJzdWIiOiJzdHVkZW50X2E2Zm5pNyIsImF1dGhuIjp7InN1YiI6InN0dWRlbnRfYTZmbmk3IiwiaWFtX2lkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20ifSwiYWNjb3VudCI6eyJ2YWxpZCI6dHJ1ZSwiYnNzIjoiOGE0MjU1N2Y4MmViNDU2MjgyNzM3OGM5N2Y4MzQzNzQiLCJpbXNfdXNlcl9pZCI6IjEyNzQ3NTYzIiwiZnJvemVuIjp0cnVlLCJpc19lbnRlcnByaXNlX2FjY291bnQiOmZhbHNlLCJlbnRlcnByaXNlX2lkIjoiZWU1NzVjNTc3ODc2NGQ0MDkxNTVhYTM1NzgwZWM4ZDEiLCJpbXMiOiIyOTQ1MjM3In0sImlhdCI6MTcyODIwMzMzMiwiZXhwIjoxNzI4MjA2OTMyLCJpc3MiOiJodHRwczovL2lhbS5jbG91ZC5pYm0uY29tL2lkZW50aXR5IiwiZ3JhbnRfdHlwZSI6InVybjppYm06cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6YXBpa2V5Iiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiZGVmYXVsdCIsImFjciI6MSwiYW1yIjpbInB3ZCJdfQ.g68jxw-cPwyJMUQt_HscBzRa_lt4EU9rry82MWfZQ6Q4PyL-CG59HvMH4bCfZh7JmoefveNTVNQcaCp19PQ9hNr39aZnj6DkRQa0jnfP3MjxHYqJGqtQIJKNkhawHbQ3hlu0qit6qib7FupdwpUFhL9_cEuXQiBAIScZCpBXovHfz3UVymKoN7SNQlyZ-u9LlDtA-CGi-cAcVoYZHavzjeAWqgJBeOdRG04LCycukNBy3uj5m_y0oDrZ_vPXkP39xofoj7kUHqmDYSgstv58jdC0sXsASuaeLeelwg1ZgmBop2QJT0Q_zl3FXkbYxQMH_K2zOZNDJfZEaJ30wwPuTg';
};

// Function to create headers
const createHeaders = () => {
    const authToken = getAuthToken();
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
            credentials: 'omit'
        });

        // Log the response status for debugging
        console.log(`Response Status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log('API Response Data:', data); // Log the entire response data for debugging

        const translatedText = data.results[0].generated_text;
        console.log('Extracted Translated Text:', translatedText); // Log the extracted translated text

        return translatedText;
    } catch (error) {
        console.error('Error making API call:', error);
        throw error;
    }
};

// Listener for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetchTranslation") {
        const url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
        const systemMessages = `

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
        - Focus on User's Questions`;
        const payload = {
            "input": `${systemMessages} Answer this request: ${message.text}`,
            "parameters": {
                "decoding_method": "sample",
                "max_new_tokens": 40,
                "temperature": 0.7,
                "top_k": 50,
                "repetition_penalty": 1.2
            },
            "model_id": "meta-llama/llama-3-1-8b-instruct",
            "project_id": "fbf6de7e-3d96-431f-80ca-3f34c3cd663e",
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