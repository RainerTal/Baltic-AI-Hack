if(document.querySelector('.execute-button')){
document.querySelector('.execute-button').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "start-translate" });
    });
});
}


if(document.getElementById('audio-player'))
{
const audio = document.getElementById('audio-player');
document.getElementById('speed').addEventListener('input', (event) => {
	audio.playbackRate = event.target.value;
});

document.getElementById('jump-time').addEventListener('click', () => {
	const time = document.getElementById('time').value;
	audio.currentTime = time; 
});
document.getElementById('fetch-audio').addEventListener('click', ()=>{

    document.getElementById('fetch-audio').disabled = true;
    chrome.runtime.sendMessage({ action: "fetchTTS" }, (response) => {
        if (response && response.action === "play_audio") {
			//&& sender.id == '<your_extension_id>'
            if (response.base64) {
				fetch(response.base64)
				.then((rez) => rez.blob().then((bl)=>{
				                const audioUrl = URL.createObjectURL(bl); 
                const audio = document.getElementById('audio-player');
                audio.src = audioUrl;
				document.getElementById('fetch-audio').disabled = false; 
                audio.play();
				}));
            } else {
                console.error("Received response is not a valid base:", response.base64);
            }

        } else if (response.error) {
            console.error("Error fetching audio:", response.error);
            document.getElementById('fetch-audio').disabled = false; 
        }
    });
});
}