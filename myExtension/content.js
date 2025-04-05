// This is the browser
console.log('starting up content.js');

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

    console.log(request.data);

    // Scrape elements
    let wordClass = document.querySelector('.RES9jf.xWMiCc.pb3iw.BJ0kwe');
    let definitionClass = document.querySelector('.PZPZlf[data-attrid="SenseDefinition"]');
    let pronunciationClass = document.querySelector('.kVF6d');
    let posClass = document.querySelector('.YrbPuc.vdBwhd');
    
    console.log("HTML for word: ", wordClass);
    console.log('HTML for definition: ', definitionClass);
    console.log('HTML for pronuciation: ', pronunciationClass);
    console.log('HTML for Part of Speech:', posClass);

    // Get Word
    let wordElement = wordClass.querySelector('span[data-dobid="hdw"]');
    let word = wordElement.textContent;
    word = word.replace(/·/g, '').trim();
    console.log('Word:', word);
    
    // Get Defintion
    const dataPsd = definitionClass.getAttribute('data-psd');
    const definition = dataPsd.split('~:&')[1];
    console.log('Definition:', definition);

    // Get Pronunciation
    let rawPronunciation = pronunciationClass.querySelector('span.ApHyTb.ZYHQ7e.Dp60wb');
    let cleanedPronunciation = rawPronunciation.textContent.trim();
    let pronunciation = cleanedPronunciation.replace(/\//g, '');
    console.log('Pronuciation:', pronunciation);

    // Get Part of speech
    let rawPOS = posClass.querySelector('span.LpLPAf.ZYHQ7e');
    let pos = rawPOS.textContent.trim()
    console.log('Part of Speech:', pos);

    // send res back to the sender (the popup.js)
    sendResponse({word, definition, pronunciation, pos})
});