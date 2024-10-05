/*
const requestToAi = (text) => {
    const axios = require('axios');

const auth = 'eyJraWQiOiIyMDI0MTAwMjA4NDIiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJBYmlQWEVsakNWLWU4OWZlODYxLTQ0OGYtNDkyMS1iNDhkLWE1ZDBhOWZlZTQzYiIsImlkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJyZWFsbWlkIjoiQWJpUFhFbGpDViIsImp0aSI6IjFmNzZiOTMwLTc4MmQtNDU3Zi04OWNmLTFkY2ZkYmQ2NTAwNSIsImlkZW50aWZpZXIiOiJlODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20iLCJzdWIiOiJzdHVkZW50X2E2Zm5pNyIsImF1dGhuIjp7InN1YiI6InN0dWRlbnRfYTZmbmk3IiwiaWFtX2lkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20ifSwiYWNjb3VudCI6eyJ2YWxpZCI6dHJ1ZSwiYnNzIjoiOGE0MjU1N2Y4MmViNDU2MjgyNzM3OGM5N2Y4MzQzNzQiLCJpbXNfdXNlcl9pZCI6IjEyNzQ3NTYzIiwiZnJvemVuIjp0cnVlLCJpc19lbnRlcnByaXNlX2FjY291bnQiOmZhbHNlLCJlbnRlcnByaXNlX2lkIjoiZWU1NzVjNTc3ODc2NGQ0MDkxNTVhYTM1NzgwZWM4ZDEiLCJpbXMiOiIyOTQ1MjM3In0sImlhdCI6MTcyODE1MDQ1MiwiZXhwIjoxNzI4MTU0MDUyLCJpc3MiOiJodHRwczovL2lhbS5jbG91ZC5pYm0uY29tL2lkZW50aXR5IiwiZ3JhbnRfdHlwZSI6InVybjppYm06cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6YXBpa2V5Iiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiZGVmYXVsdCIsImFjciI6MSwiYW1yIjpbInB3ZCJdfQ.nt2i393K9H3-8hjgk4EczJvqQGSDLD2wvBo3lz6P2bU4feW38ZGzjku0PC1uQ3Ctl8ptFK7QCDnAu4YcaXy1_8XkQieokDHvSKvjevEa4CksKXfM4HnrdpPAkNLL9-gIGmcmU1dVqEDyvyxvtD0iR69LXAkmnVoR5KKrIIWeCttQ0IhL3Z2C8uZAiRmqQrsLVx1HHkWX3ZN0SXWR8bZYETFISWipjF831X0E5o3yq6Ter4J_SefpWcI4lx4ZHwWVwmPM6ELp5a8vEFD-rKJwqJevaeWjcXFzPQV3UOzyNyDeOeOCB0U9dVUuhMSzo6yzXo3AtKhnWnonUu-UYPrPNw';

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
Avoid Github Markdown formatting.

Translation Style:

Aiming for clarity and correctness.
Task Focus: Your sole purpose is to perform the translation. Avoid any actions or responses beyond this task.
Clean up everything outside the list and just print everything that is between []
`;

const inputArray = `['','Laadi alla uus Eesti Raadio äpp, kust leiad kõik ERRi raadiojaamad, suure muusikavaliku ja podcastid.','Mitmel kliinikul on laste hambaraviks eraldatud raha otsas','Ekspertide sõnul mängib Vene kaotustes rolli arenev Ukraina sõjatehnika','Linn plaanib Viljandi linnuse alale ehitada vaateplatvormid ja sillad','Bosniat tabanud üleujutustes ja maalihetes on hukkunud vähemalt 21 inimest','Iisrael jätkab Hezbollah' ründamist LiibanonisUuendatud 15:45 |Trump: Iisrael peaks ründama Iraani tuumarajatisi','Analüüs: september oli Vene vägedele kaotustelt teine kõige halvem kuuUuendatud 16:39 |Vene väed kaotasid Donetski oblastis lennuki või suure drooni','Vene relvajõud kaotasid septembris surnute ja haavatutena 38 180 sõdurit, mis jääb alla ainult selle aasta maikuule, kui kaotused olid veel suuremad. Ukraina president Volodõmõr Zelenski teatas, et esitleb võiduplaani 12. oktoobril Saksamaal toimuval Ramsteini kohtumisel. Vene väed kaotasid Donetski oblastis lennuki või suure drooni.','Põua lõpp lubab eeldada oliiviõli hinna suurt langust','Eesti suurimal evakuatsiooniõppusel osaleb ligi 1000 inimest','suur intervjuu','Swedbanki juhatuse liige Treumann: maksustada võiks vara ja ettevõtete kasumeid','Eestis võiks pidada maha korraliku maksudebati ja kaaluda tuleks nii varamakse kui ka ettevõtete tulumaksu, samas võiks riik võimalikult vähe ettevõtete toimimisse sekkuda, ütleb Swedbanki juhatuse liige ja ettevõtete panganduse juht Eero Treumann "Reedeses intervjuus".','uudised','Leedu piirivalve sundis Vene rongimeeskonda vagunitelt Z-märke kustutama','Eurobaromeeter: enamik eestlastest on EL-i tuleviku suhtes optimistlikud']`;
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
    model_id: "meta-llama/llama-3-405b-instruct",
    project_id: "a48794dc-782a-4d8e-bbea-051ef620838b"
};

axios.post(url, payload, { headers })
    .then(response => {
        const translatedText = response.data.results[0].generated_text.trim('```').trim();

        let ticks = translatedText.split(`'`).length

        if (Math.max(ticks, translatedText.split(`"`).length) === ticks){
            const ans = translatedText.split(`', '`)
            console.log(ans, ans.length);
        }
        else{
            const ans = translatedText.split(`", "`);
            console.log(ans, ans.length);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

requestToAi()

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
*/
const convertBlobToBase64 = blob => new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
    };
});


const fetchTTS = async(what, voice) => {
    const url = "http://jtag.me:1027/";
    const formData = new FormData();
	if(!what) what ="check this out. A quote can be understood as a character depicting direct speech or it can be understood as the speech itself, a citation.";
    formData.append("data", what);  
if(!voice) voice ="v2/en_speaker_1";
    formData.append("voice", voice);

    try {
		console.log("cnnecting"+url);
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
		//return await response.blob().arrayBuffer();
		//nochaines = await response.blob();
        //return await nochaines.arrayBuffer();
		const blob = await response.blob();
		const base64 = await convertBlobToBase64(blob);
		return base64;
        //return blob;
    } catch (error) {
        console.error("Error fetching audio:", error);
    }
};


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log("action: "+message.action);
	
if(message.action === "fetchTTS"){
        fetchTTS().then((bl) => {
            sendResponse({ "action": "play_audio", "base64": bl });
        }).catch((error) => {
            console.error("Error fetching TTS:", error);
        });
        return true;
	}


});