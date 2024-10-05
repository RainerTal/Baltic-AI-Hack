console.log("is?");
//console.log(chrome.runtime)
if(!window.top._backupruntime)
window.top._backupruntime = chrome.runtime;

console.log(window.top._backupruntime);