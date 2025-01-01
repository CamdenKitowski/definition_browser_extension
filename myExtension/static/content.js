let buttonElement = document.getElementById('addDefinitionButton');

function handleButtonClick() {
    console.log('Button was clicked');
    fetch('http://127.0.0.1:5000/add_definition', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: 'example'
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
    });
}

buttonElement.addEventListener('click', handleButtonClick);