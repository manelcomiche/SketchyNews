import 'dotenv/config';

import express from 'express'
const app = express();

import path from 'path';
global.__dirname = path.resolve();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

app.use(express.static(path.join(__dirname, '/src/Web/public')));

app.get('/', (req, res) => { res.sendFile('index.html'); })

app.get('/api/generate', async (req, res) => {
    const prompt = req.query.prompt;

    const fetchGPT = await fetch(`https://api.hypere.app/playground/api/image?prompt=Based on the following description: ${prompt} generate me an artistic image of what I entered putting your own vision of it.`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    });

    const fetchText = await fetchGPT.text();
    if (!fetchText || fetchText && fetchText.length <= 0) { interaction.sendFollowUp({ embeds: [{ color: 16711680, description: `${emojis.NoEmoji} *\`|\` ${t('common:generalMessages.noFound')}*` }] }); return; }

    res.send(fetchText)
});