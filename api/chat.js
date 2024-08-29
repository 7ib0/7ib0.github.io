// api/chat.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { message } = req.body;

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

        const data = await response.json();
        const aiReply = data.choices[0].text.trim();
        res.json({ reply: aiReply });
    } catch (error) {
        console.error('Error communicating with the AI:', error);
        res.status(500).json({ reply: 'Sorry, something went wrong.' });
    }
}
