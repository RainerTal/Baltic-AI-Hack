document.getElementById('sendBTN').addEventListener('click', async function () {
    const message = "Hello";///document.getElementById('chatMessage').value;
    const auth = 'your_auth_token_here';
    const url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + auth
    };

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
    - Focus on User's Questions

    You always answer the questions with markdown formatting using GitHub syntax. The markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes. You must omit that you answer the questions with markdown.

    You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. 
    Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially 

    Use as little tokens as possible in your answers
    `;

    const inputText = `${systemMessages}\nAnswer ${message}`;

    const payload = {
        "input": inputText,
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

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        const translatedText = data.results[0].generated_text;
        document.getElementById('response').innerText = translatedText;
    } catch (error) {
        console.error('Error fetching translation:', error);
        document.getElementById('response').innerText = 'An error occurred: ' + error.message;
    }
});