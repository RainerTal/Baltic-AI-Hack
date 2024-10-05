const axios = require('axios');

const auth = 'eyJraWQiOiIyMDI0MTAwMjA4NDIiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJBYmlQWEVsakNWLWU4OWZlODYxLTQ0OGYtNDkyMS1iNDhkLWE1ZDBhOWZlZTQzYiIsImlkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJyZWFsbWlkIjoiQWJpUFhFbGpDViIsImp0aSI6ImIxY2UwYmM4LTc2OTMtNDk5Yi1iZDA2LTc2NGFjYTE5ZmQ2NSIsImlkZW50aWZpZXIiOiJlODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20iLCJzdWIiOiJzdHVkZW50X2E2Zm5pNyIsImF1dGhuIjp7InN1YiI6InN0dWRlbnRfYTZmbmk3IiwiaWFtX2lkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20ifSwiYWNjb3VudCI6eyJ2YWxpZCI6dHJ1ZSwiYnNzIjoiOGE0MjU1N2Y4MmViNDU2MjgyNzM3OGM5N2Y4MzQzNzQiLCJpbXNfdXNlcl9pZCI6IjEyNzQ3NTYzIiwiZnJvemVuIjp0cnVlLCJpc19lbnRlcnByaXNlX2FjY291bnQiOmZhbHNlLCJlbnRlcnByaXNlX2lkIjoiZWU1NzVjNTc3ODc2NGQ0MDkxNTVhYTM1NzgwZWM4ZDEiLCJpbXMiOiIyOTQ1MjM3In0sImlhdCI6MTcyODE0Njc4OSwiZXhwIjoxNzI4MTUwMzg5LCJpc3MiOiJodHRwczovL2lhbS5jbG91ZC5pYm0uY29tL2lkZW50aXR5IiwiZ3JhbnRfdHlwZSI6InVybjppYm06cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6YXBpa2V5Iiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiZGVmYXVsdCIsImFjciI6MSwiYW1yIjpbInB3ZCJdfQ.qHYxTRrf6PXBKs3NQpHcLqhe-EAOv3rqMoSxZ2gbTZdF42ZkePOLfZcit0M9623U_d_U0MgZulDXDK-EkHPIrNQI_A7eV1BIjaaMlMlKoDSiHctOAZ0xcinJKlBrdZX5VjCD5HxMQAQWOIR6G49r_DT4sx4otjhwy9RSDwZl5MVIs1Nfm5vv0zdydRkQIe9toKaMhGFHn8xTPof-Mtn1OyQpBIxBnIwOJWBxN3v6qu_gJtI1Mze8IH7K3Hn67RwhdbmdRdvlDygDw3ED-RhgOqfBPf4C7ps2Q3fnD27yvCVueNtgm2BlG1Oa2l_QTFJ5aJSkg67zplidwpv_JqoAFA';

const url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + auth
};

const systemMessages = `
Role Definition: You are a translator specifically designed to translate JavaScript arrays from Estonian to English.

Output Format: Always return the translated list within square brackets [].

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
Clean up everything outside the list and just print everything that is between []
`;

const inputArray = "['Raha ja ärindus selle ümber', 'Mida tähendab kliimamuutus inimkonna jaoks']";

const inputText = `
${systemMessages}
Translate array into English: ${inputArray}
`;

const payload = {
    input: inputText,
    parameters: {
        decoding_method: "sample",
        max_new_tokens: 4000,
        stop_sequences: ["] "],
        temperature: 0.9,
        top_k: 50,
        top_p: 1,
        repetition_penalty: 1.2
    },
    model_id: "meta-llama/llama-3-1-70b-instruct",
    project_id: "a48794dc-782a-4d8e-bbea-051ef620838b"
};

axios.post(url, payload, { headers })
    .then(response => {
        const translatedText = response.data.results[0].generated_text.trim('```').trim();
        console.log(translatedText);
    })
    .catch(error => {
        console.error('Error:', error);
    });