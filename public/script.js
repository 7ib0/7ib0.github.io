async function processMessage(message) {
    addMessage('Bot: Thinking...', 'bot');

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });

        const data = await response.json();
        const aiResponse = data.reply;

        const botMessageElement = document.querySelector('.bot:last-of-type');
        botMessageElement.textContent = 'Bot: ' + aiResponse;

        speak(aiResponse);
    } catch (error) {
        console.error('Error communicating with the AI:', error);
        const botMessageElement = document.querySelector('.bot:last-of-type');
        botMessageElement.textContent = 'Bot: Sorry, something went wrong.';
    }
}
