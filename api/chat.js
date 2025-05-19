import fetch from 'node-fetch';

export default async function handler(req, res) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (req.method === 'OPTIONS') {
        return res.status(204).set(corsHeaders).end();
    }

    if (req.method === 'POST') {
        try {
            const { message } = req.body;

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

            return res.status(200).set(corsHeaders).json({ reply: aiReply });
        } catch (error) {
            console.error('Error communicating with the AI:', error);
            return res.status(500).set(corsHeaders).json({ reply: 'Sorry, something went wrong.' });
        }
    } else {
        return res.status(405).set(corsHeaders).json({ reply: 'Method not allowed.' });
    }
}
