console.log('the beginning');

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

    console.log(request.data);

    // Scrape elements
    let wordClass = document.querySelector('.RES9jf.xWMiCc.JgzqYd');
    let definitionClass = document.querySelector('.PZPZlf[data-attrid="SenseDefinition"]');
    let posClass = document.querySelector('.YrbPuc.vdBwhd');
    let pronunciationClass = document.querySelector('.kVF6d');

    console.log("HTML for word: ", wordClass);
    console.log('HTML for definition: ', definitionClass);
    console.log('HTML for Part of Speech:', posClass);
    console.log('HTML for pronuciation: ', pronunciationClass);

    // Get Word
    let wordElement = wordClass.querySelector('span[data-dobid="hdw"]');
    let word = wordElement.textContent;
    word = word.replace(/·/g, '').trim();
    console.log('Word:', word);
    
    // Get Defintion
    const dataPsd = definitionClass.getAttribute('data-psd');
    const definition = dataPsd.split('~:&')[1];
    console.log('Definition:', definition);

    // Get part of speech
    let rawPOS = posClass.querySelector('span.YrbPuc');
    let pos = rawPOS.textContent.trim()
    console.log('Part of Speech:', pos);
    
    // Pronunciation
    let rawPronunciation = pronunciationClass.querySelector('span.wHYlTd');
    let cleanedPronunciation = rawPronunciation.textContent.trim();
    let pronunciation = cleanedPronunciation.replace(/\//g, '');
    console.log('Pronuciation:', pronunciation);

    // send res back to the sender (the popup.js)
    sendResponse({word, definition, pronunciation, pos})

});