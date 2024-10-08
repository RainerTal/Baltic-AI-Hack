const utiliseEntirePage = () => {let elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, p'));

let originalText = elements.map(el => el.textContent + 'yap');//.join(' /!/ ');

//send api request to LLM to translate the text
//receive the translated text (with the /!/ delimiters still in place) as answer

let translatedText = "Translated text for first element yap /!/ Translated text for second element yap /!/ ..."; 

let translatedElements = translatedText.split(' /!/ ');

elements.forEach((el, index) => {
  let translatedContent = originalText[index];  // originaltext for testing purposes
  
  // Iterate over child nodes and update only the first text node
  let textNodes = Array.from(el.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
  
  if (textNodes.length > 0) {
    // Update only the first text node's content
    textNodes[0].nodeValue = translatedContent;
  }
});
};

const utiliseSelection = () => {
    // Step 1: Get the current selection
    let selection = window.getSelection();
  
    if (!selection.rangeCount) {
      console.log("No text selected. Please select some text on the page.");
      return;
    }
  
    // Step 2: Get the range and the selected text
    let range = selection.getRangeAt(0); // First range of selection
    let selectedText = selection.toString(); // Selected text as a string
  
    if (!selectedText) {
      console.log("Please select some text.");
      return;
    }
  
    console.log("Selected text:", selectedText);
  
    // Step 3: Modify the selected text
    // Example: Convert the text to uppercase
    let modifiedText = selectedText.toUpperCase(); // Modify as needed
  
    // Step 4: Replace the selected text in the DOM
    range.deleteContents(); // Remove the original selected text
  
    // Insert the modified text back into the same position
    let newNode = document.createTextNode(modifiedText);
    range.insertNode(newNode);
  
    // Clear the selection to avoid confusion
    selection.removeAllRanges();
  
    console.log("Modified text inserted:", modifiedText);
  };
  