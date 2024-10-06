chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetchTranslation") {
        console.log("Starting request");

        const originalText = message.text;
        console.log(originalText);

        const auth = 'eyJraWQiOiIyMDI0MTAwMjA4NDIiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJBYmlQWEVsakNWLWU4OWZlODYxLTQ0OGYtNDkyMS1iNDhkLWE1ZDBhOWZlZTQzYiIsImlkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJyZWFsbWlkIjoiQWJpUFhFbGpDViIsImp0aSI6IjNlZmE5MDIxLTM5MjktNDg5MS05MTY4LTY2Mzg0NWJmOTIxMSIsImlkZW50aWZpZXIiOiJlODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20iLCJzdWIiOiJzdHVkZW50X2E2Zm5pNyIsImF1dGhuIjp7InN1YiI6InN0dWRlbnRfYTZmbmk3IiwiaWFtX2lkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20ifSwiYWNjb3VudCI6eyJ2YWxpZCI6dHJ1ZSwiYnNzIjoiOGE0MjU1N2Y4MmViNDU2MjgyNzM3OGM5N2Y4MzQzNzQiLCJpbXNfdXNlcl9pZCI6IjEyNzQ3NTYzIiwiZnJvemVuIjp0cnVlLCJpc19lbnRlcnByaXNlX2FjY291bnQiOmZhbHNlLCJlbnRlcnByaXNlX2lkIjoiZWU1NzVjNTc3ODc2NGQ0MDkxNTVhYTM1NzgwZWM4ZDEiLCJpbXMiOiIyOTQ1MjM3In0sImlhdCI6MTcyODE2MjA0NSwiZXhwIjoxNzI4MTY1NjQ1LCJpc3MiOiJodHRwczovL2lhbS5jbG91ZC5pYm0uY29tL2lkZW50aXR5IiwiZ3JhbnRfdHlwZSI6InVybjppYm06cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6YXBpa2V5Iiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiZGVmYXVsdCIsImFjciI6MSwiYW1yIjpbInB3ZCJdfQ.Vu_c44RLawbiVA5rdTwM5fAq1hCTLRFLFB-IhdHg77POKnNJxt3DfmGl59rvE21FLSU2N4gT3OixVHjQyTm513qbqEuGOOc6A9l4-FOzy9pcbseuoRzAIFEU7chCOVIZo8ICIAL_2Oq1apkz3VOK1loZ3jSFajl47koPM0bokPPcTrvNgLMVIEfKxKt0RP09bboA2jNJfC7i8twnS_UvEImwbZnpkvFZ72epkd4Z9uwROIaCMuyq9-byBezyMqmcvvDgpXlJHhAeGBmT3klG2x3BYc9J3FKIe-4t847yxxL80A1J-lNfLtt9jSMWOhRegk-HBE3q3sgyvCmbHmTMGw';
        const url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + auth
        };

        const system_messages = `
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
        - Focus on User's Questions

        You always answer the questions with markdown formatting using GitHub syntax. The markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes. You must omit that you answer the questions with markdown.

        You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. 
        Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially 

        Use as little tokens as possible in your answers
        `;

        const input_text = `${system_messages} Answer ${originalText}`;

        const payload = {
            "input": input_text,
            "parameters": {
                "decoding_method": "sample",
                "max_new_tokens": 1000,
                "temperature": 0.9,
                "top_k": 50,
                "repetition_penalty": 1.1
            },
            "model_id": "meta-llama/llama-3-1-70b-instruct",
            "project_id": "a48794dc-782a-4d8e-bbea-051ef620838b",
        };

        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const translated_text = data.results[0].generated_text;
            sendResponse({ translatedText: translated_text });
        })
        .catch(error => {
            console.error('Error fetching translation:', error);
            sendResponse({ error: 'Failed to fetch translation' });
        });

        return true; // Indicate you will send a response asynchronously
    }
});