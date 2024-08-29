// Function to convert text to speech
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

// Function to listen for speech input
function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        addMessage('User: ' + transcript, 'user');
        processMessage(transcript);
    };

    recognition.start();
}

// Function to process the user's message and respond
function processMessage(message) {
    let response = "Sorry, I didn't understand that.";

    if (message.includes('hello') || message.includes('hi')) {
        response = 'Hello! How can I assist you today?';
    } else if (message.includes('how are you')) {
        response = "I'm just a bot, but I'm doing great! How about you?";
    } else if (message.includes('bye') || message.includes('goodbye')) {
        response = 'Goodbye! Have a nice day!';
    }

    addMessage('Bot: ' + response, 'bot');
    speak(response);
}

// Function to add a message to the chat
function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = sender;
    messageElement.textContent = message;
    document.getElementById('messages').appendChild(messageElement);
}

// Event listener for the talk button
document.getElementById('talk-btn').addEventListener('click', startListening);
