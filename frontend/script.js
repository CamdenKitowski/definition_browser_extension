// Mock data (replace this with your API fetch if needed)
const cardData = [
    {
        word: 'Cogent',
        pronunciation: 'koh-juhnt',
        part_of_speech: 'Adjective',
        definition: 'Clear, logical, and convincing.'
    },
    {
        word: 'Ameliorate',
        pronunciation: 'uh-meel-yuh-rayt',
        part_of_speech: 'Verb',
        definition: 'To make something better or improve.'
    }
];

// Populate the card container
const cardContainer = document.getElementById('cardContainer');

function populateCards(data) {
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${item.word}</h2>
            <p class="pronunciation">/${item.pronunciation}/</p>
            <p><strong>Part of Speech:</strong> ${item.part_of_speech}</p>
            <p class="definition">${item.definition}</p>
        `;
        cardContainer.appendChild(card);
    });
}

function getCardData() {
    fetch('http://127.0.0.1:5000/get_definitions')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log('^^^^^^^^')
        })
        .catch(error => console.error('Error fetching tasks:', error));
}
    

getCardData();


// Fetch data and display cards (use this block if fetching from an API)
// fetch('http://127.0.0.1:5000/get_definitions')
//     .then(response => response.json())
//     .then(data => populateCards(data));

// For now, display mock data
populateCards(cardData);
