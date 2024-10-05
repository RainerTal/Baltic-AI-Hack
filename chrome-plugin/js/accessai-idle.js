
function speakText() {
(window.speechSynthesis || window.webkitSpeechSynthesis).speak(new SpeechSynthesisUtterance("Hello Hack AI! Nice to meet you!"))
}
console.log(document);

if(chrome.runtime){
const script = document.createElement('script');
script.src = chrome.runtime.getURL('js/accessai-idle.js');
(document.head || document.documentElement).appendChild(script);
script.onload = function() {
    script.remove();
};
}

//setTimeout((fn)=> {if(!speakText) speakText = fn}, 1000,  speakText)

if(!document.querySelector("button.AccessAI-trigger")) document.body.insertAdjacentHTML( 'beforeend', "<button onclick=\"speakText()\" class=\"AccessAI-trigger\">Speak</button>")
//window.onload = () => document.querySelector("button").click();
