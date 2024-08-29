async function processMessage(message) {
    addMessage('Bot: Thinking...', 'bot');

    try {
        // Adjust this URL to match your deployed function's endpoint
        const response = await fetch('https://your-vercel-project.vercel.app/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const aiResponse = data.reply;

        addMessage('Bot: ' + aiResponse, 'bot');
    } catch (error) {
        console.error('Error:', error);
        addMessage('Bot: Sorry, something went wrong.', 'bot');
    }
}

function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = sender;
    messageElement.textContent = message;
    document.getElementById('messages').appendChild(messageElement);
}

// Attach event listener to the send button
document.getElementById('send-btn').addEventListener('click', () => {
    const inputElement = document.getElementById('user-input');
    const message = inputElement.value.trim();
    if (message) {
        addMessage('User: ' + message, 'user');
        processMessage(message);
        inputElement.value = '';  // Clear the input field
    }
});
