// Populate the card container
const cardContainer = document.getElementById('cardContainer');

function populateCards(data) {

    cardContainer.innerHTML = ``;
    data.forEach(item => {
        const { id, word, definition, part_of_speech, pronunciation } = item
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${word}</h2>
            ${pronunciation ? `<p class="pronunciation">/${pronunciation}/</p>` : ''}
            ${part_of_speech ? `<p>${part_of_speech}</p>` : ''}
            <p class="definition">${definition}</p>
        `;
        cardContainer.appendChild(card);
    });
}

async function getCardData() {
    try {
        const response = await fetch('/api/get_definitions');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Unexpected response format: Expected an array.");
        }
        console.log('Data: ', data);
        data.sort((a, b) => a.word.localeCompare(b.word));
        return data;
    } catch (error) {
        console.error('Error fetching definitions:', error);
        return [];
    }
}

function randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

document.getElementById('sortButton').addEventListener('click', 
    debounce(async () => {
        const data = await getCardData();
        populateCards(data);
    }, 200)
);

document.getElementById('randomizeButton').addEventListener('click', 
    debounce(async () => {
        const data = await getCardData();
        const randomizeData = randomizeArray(data);
        populateCards(randomizeData);
    }, 200)
);

getCardData().then(data => {
    if (Array.isArray(data)) {
        populateCards(data);
    } else {
        console.error("Wrong data format:" , data);
    }
})
