console.log('the beginning');

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

    console.log(request.data);

    // Scrape elements
    let wordClass = document.querySelector('.RES9jf.xWMiCc.JgzqYd');
    let definitionClass = document.querySelector('.PZPZlf[data-attrid="SenseDefinition"]');

    console.log(" HTML for word: ", wordClass);
    console.log('HTML for definition: ', definitionClass);

    // Get Word
    let wordElement = wordClass.querySelector('span[data-dobid="hdw"]');
    let word = wordElement.textContent;
    word = word.replace(/·/g, '').trim();
    console.log('Word:', word);
    
    // Get Defintion
    const dataPsd = definitionClass.getAttribute('data-psd');
    const definition = dataPsd.split('~:&')[1];
    console.log('Definition:', definition.trim());
    
    // send res back to the sender (the popup.js)
    sendResponse({word, definition})

});