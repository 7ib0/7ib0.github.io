async function processMessage(message) {
    addMessage('Bot: Thinking...', 'bot');

    try {
        const response = await fetch('https://your-vercel-project.vercel.app/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });

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
