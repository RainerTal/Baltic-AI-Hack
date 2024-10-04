
function speakText() {
(window.speechSynthesis || window.webkitSpeechSynthesis).speak(new SpeechSynthesisUtterance("Hello Hack AI! Nice to meet you!"))
}

if(!document.querySelector("button.AccessAI-trigger")) document.body.insertAdjacentHTML( 'beforeend', "<button onclick=\"speakText()\" class=\"AccessAI-trigger\">Speak</button>")
//window.onload = () => document.querySelector("button").click();
