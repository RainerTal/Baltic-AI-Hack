
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