console.log('starting up');

function uploadtoDatabase(word, definition) {
    console.log('Button was clicked');
    fetch('http://127.0.0.1:5000/add_definition', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            word: word,
            definition: definition
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
    const scrapeButton = document.getElementById('scrapeButton');
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

function handleMessageResponse(response) {
    // const msg = document.createElement("h3");
    // msg.innerHTML = 'Scraped: ' + response;
    // document.getElementById("main").appendChild(msg);

    console.log('Scraped data:', response);
    const word = response.word;
    const definition = response.definition;

    uploadtoDatabase(word, definition);
    console.log('finished uploading');
}

let uploadToDatabase = document.getElementById('addDefinitionButton');
uploadToDatabase.addEventListener('click', handleButtonClick);
