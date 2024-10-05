console.log(chrome.runtime);
//setTimeout((fn)=> {if(!speakText) speakText = fn}, 1000,  speakText)
	if(!window.top._backupruntime)
window.top._backupruntime = chrome.runtime;
if(!document.querySelector("button.AccessAI-trigger")) document.body.insertAdjacentHTML( 'beforeend', "<button class=\"AccessAI-trigger\">Speak</button>")
	
if(!document.querySelector("p#output")) document.body.insertAdjacentHTML( 'beforeend', "<p id=\"output\">loadign</p>")
//window.onload = () => document.querySelector("button").click();
if(chrome.runtime){
const script = document.createElement('script');
script.src = chrome.runtime.getURL('js/accessai-idle.js');
(document.head || document.documentElement).appendChild(script);
script.onload = function() {
    script.remove();
};
}

document.querySelector('button.AccessAI-trigger').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "requestToAi" });
    });
});

/*
document.querySelector("button.AccessAI-trigger").addEventListener('click', (rt) => {
	console.log(rt);
	input_text="['kaķis', 'suns', 'žirafe']"
	window.top._backupruntime.sendMessage({ action: 'requestToAi', input_text: input_text }, (response) => {
        if (response.result) {
            console.log("Translated Array:", response.result);
            document.getElementById('output').innerText = JSON.stringify(response.result);
        } else if (response.error) {
            console.error("Error:", response.error);
        }
    });
(window.speechSynthesis || window.webkitSpeechSynthesis).speak(new SpeechSynthesisUtterance("Hello Dear! Nice to meet you!"))
}, chrome.runtime
);*/
