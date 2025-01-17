console.log('starting up popup.js');

function uploadtoDatabase(word, definition, pronunciation, pos) {
    console.log('Button was clicked');
    fetch('http://127.0.0.1:8080/add_definition', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            word: word,
            definition: definition,
            pronunciation: pronunciation,
            pos: pos
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response, ' the response');
        return response.json();
    })
    .then(data => {
        console.log('success', data);
    })
    .catch(error => {
        console.error('Error uploading to Flask API:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeScrapeButton();
});

function initializeScrapeButton() {
    const scrapeButton = document.getElementById('addDefinitionButton');
    scrapeButton.addEventListener('click', handleScrapeButtonClick);
}

function handleScrapeButtonClick() {
    chrome.tabs.query({active: true, currentWindow:true}, tabs => {
        sendMessageToTab(tabs[0].id);
    });
}

function sendMessageToTab(tabId) {
    chrome.tabs.sendMessage(tabId, {data: "Trigger Listener" }, handleMessageResponse)
}

async function checkDup(word) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/check_duplicate?word=${encodeURIComponent(word)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.exists;
    } catch (error) {
        console.error('Error checking for duplicate:', error);
        return false;
    }
}

async function handleMessageResponse(response) {
    

    console.log('Scraped data:', response);

    if (!response || !response.word || !response.definition) {
        console.error('Invalid scraped data:', response);
        const errorMsg = document.createElement('h4');
        errorMsg.style.color = "red";
        errorMsg.innerHTML = "Error: Invalid data received.";
        document.getElementById("main").appendChild(errorMsg);
        return;
    }

    const word = response.word;
    const definition = response.definition;
    const pronunciation = response.pronunciation;
    const pos = response.pos;

    


    const isDup = await checkDup(word);

    // Check if the word already exists in the database
    if (isDup) {
        console.log('ERROR: Duplicate word detected');
        errorMsg = document.createElement('h4');
        errorMsg.style.color = "red";
        errorMsg.innerHTML = `Error: '${word}' already exists in the database.`;
        document.getElementById("main").appendChild(errorMsg);
        return;
    }

    uploadtoDatabase(word, definition, pronunciation, pos);
    console.log('finished uploading');

    const msg = document.createElement("h4");
    msg.innerHTML = 'Added: ' + response.word;
    document.getElementById("main").appendChild(msg);
}
