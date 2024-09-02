const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        const { message } = JSON.parse(event.body);

        try {
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'text-davinci-003',
                    prompt: message,
                    max_tokens: 150,
                }),
            });

            if (!response.ok) {
                throw new Error(`OpenAI API error: ${response.statusText}`);
            }

            const data = await response.json();
            const aiReply = data.choices[0].text.trim();
            return {
                statusCode: 200,
                body: JSON.stringify({ reply: aiReply }),
            };
        } catch (error) {
            console.error('Error communicating with the AI:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ reply: 'Sorry, something went wrong.' }),
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ reply: 'Method not allowed.' }),
        };
    }
};
