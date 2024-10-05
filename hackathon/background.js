const requestToAi = (input_array) => {

    const auth = 'eyJraWQiOiIyMDI0MTAwMjA4NDIiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJBYmlQWEVsakNWLWU4OWZlODYxLTQ0OGYtNDkyMS1iNDhkLWE1ZDBhOWZlZTQzYiIsImlkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJyZWFsbWlkIjoiQWJpUFhFbGpDViIsImp0aSI6IjgyOGIxMThjLWNiNmYtNDg0Yi05MWUxLWYwYWZiOWQzMWQzNyIsImlkZW50aWZpZXIiOiJlODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20iLCJzdWIiOiJzdHVkZW50X2E2Zm5pNyIsImF1dGhuIjp7InN1YiI6InN0dWRlbnRfYTZmbmk3IiwiaWFtX2lkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20ifSwiYWNjb3VudCI6eyJ2YWxpZCI6dHJ1ZSwiYnNzIjoiOGE0MjU1N2Y4MmViNDU2MjgyNzM3OGM5N2Y4MzQzNzQiLCJpbXNfdXNlcl9pZCI6IjEyNzQ3NTYzIiwiZnJvemVuIjp0cnVlLCJpc19lbnRlcnByaXNlX2FjY291bnQiOmZhbHNlLCJlbnRlcnByaXNlX2lkIjoiZWU1NzVjNTc3ODc2NGQ0MDkxNTVhYTM1NzgwZWM4ZDEiLCJpbXMiOiIyOTQ1MjM3In0sImlhdCI6MTcyODE0MDQ3MiwiZXhwIjoxNzI4MTQ0MDcyLCJpc3MiOiJodHRwczovL2lhbS5jbG91ZC5pYm0uY29tL2lkZW50aXR5IiwiZ3JhbnRfdHlwZSI6InVybjppYm06cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6YXBpa2V5Iiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiZGVmYXVsdCIsImFjciI6MSwiYW1yIjpbInB3ZCJdfQ.LGgk2Dmka77C40dhNlwXN5x221Emqtf03klCI5vceFn_klu97RtWVGu2L9AN4px4rCJaMD__WyAXijq1cKNMMWk71lcnaPE-_fviRwvhvo5NOh1PprFD6ALqf01n8ZiIIGvRkhj1vy6WMm3eLYggkSX3jn5sbFqECX6-DwRAMY7OHVYoreUbon4qBjmxP7kqwGiy85AMYI7_CO4IyQCZm-DXbnqt5zHNm1sDYjrzAfrIQ11Lmkiy3gF2-N91D5xhDZ-h8xqEQpJ7ZHrw5MODWgJDo5rv7wqQ1nsLbZI24UOHYUYGeuMC2NI2elmVRb_ybTVYx51FG0uryIiuSBZJfA';

    const system_messages = `Role Definition: You are a translator specifically designed to translate JavaScript arrays from Estonian to English.

    Output Format: Always return the translated list within square brackets [].
    
    Response Limitation:
    
    Do not echo the original input back to the user.
    Provide no explanations, thoughts, or additional comments.
    The only output should be the translated array.
    
    Translation Guidelines:
    
    Translate phrases contextually, considering the meaning and intent behind the words.
    Adhere strictly to English grammar and language rules.
    Maintain the original list structure in the translated output.
    
    Translation Style:
    
    Aiming for clarity and correctness.
    Task Focus: Your sole purpose is to perform the translation. Avoid any actions or responses beyond this task.
    Clean up everything outside the list and just print everything that is between []`;

    const input_text = `
${system_messages}
Translate the following array into English: ${input_array}`;

    const payload = {
        input: input_text,
        parameters: {
            decoding_method: "sample",
            max_new_tokens: 4000,
            stop_sequences: ["] "],
            temperature: 0.9,
            top_k: 40,
            top_p: 0.7,
            repetition_penalty: 1.3,
        },
        model_id: "meta-llama/llama-3-1-70b-instruct",
        project_id: "a48794dc-782a-4d8e-bbea-051ef620838b",
    };

    const url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + auth,
    };

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data
        console.log('Success:', data);
        // Extract and print the translated array from the response
        const translatedArray = data.translatedArray || []; // Adjust according to actual response structure
        console.log(translatedArray);
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

console.log("alive lol")
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetchTranslation") {
        // Example of your translation logic
        console.log("starting request")

        const originalText = message.text;
        console.log(originalText)

        // Here you would call your API to get the translation
        const translatedText = requestToAi(originalText); // Replace with your actual translation API call

        // Send the translated text back to the content script
        sendResponse({ translatedText: translatedText });
    }

    // Return true to indicate you will send a response asynchronously
    return true;
});