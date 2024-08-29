// Function to convert text to speech
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onerror = function(event) {
        console.error('SpeechSynthesisUtterance.onerror', event);
    };
    speechSynthesis.speak(utterance);
}

// Function to listen for speech input
function startListening() {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
        alert("Your browser does not support speech recognition. Please use Chrome or Edge.");
        return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = function() {
        console.log('Speech recognition started');
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        addMessage('User: ' + transcript, 'user');
        processMessage(transcript);
    };

    recognition.onerror = function(event) {
        console.error('SpeechRecognition.onerror', event);
        alert('There was an error with speech recognition: ' + event.error);
    };

    recognition.onend = function() {
        console.log('Speech recognition ended');
    };

    recognition.start();
}

// Function to add a message to the chat
function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = sender;
    messageElement.textContent = message;
    document.getElementById('messages').appendChild(messageElement);
}

// Function to handle text input submission
function handleTextInput() {
    const inputElement = document.getElementById('user-input');
    const message = inputElement.value.trim();
    if (message) {
        addMessage('User: ' + message, 'user');
        processMessage(message);
        inputElement.value = '';  // Clear the input field
    }
}

// Function to process the user's message and get a response from the AI
async function processMessage(message) {
    addMessage('Bot: Thinking...', 'bot');

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer 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`,  // Replace with your API key
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: message,
                max_tokens: 150,
            }),
        });

        const data = await response.json();
        const aiResponse = data.choices[0].text.trim();

        const botMessageElement = document.querySelector('.bot:last-of-type');
        botMessageElement.textContent = 'Bot: ' + aiResponse;

        speak(aiResponse);
    } catch (error) {
        console.error('Error communicating with the AI:', error);
        const botMessageElement = document.querySelector('.bot:last-of-type');
        botMessageElement.textContent = 'Bot: Sorry, something went wrong.';
    }
}

// Event listener for the talk button
document.getElementById('talk-btn').addEventListener('click', startListening);

// Event listener for the send button
document.getElementById('send-btn').addEventListener('click', handleTextInput);

// Allow pressing "Enter" to send a message
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleTextInput();
    }
});
