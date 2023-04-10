import 'dotenv/config';

import express from 'express'
const app = express();

import replicate from "./utils/midjourneyGenerator.js";

import path from 'path';
global.__dirname = path.resolve();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

app.use(express.static(path.join(__dirname, '/src/Web/public')));

app.get('/', (req, res) => { res.sendFile('index.html'); })

app.get('/api/generate', async (req, res) => {
    const prompt = req.query.prompt;

    const generated = await replicate.run("prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb", { prompt: `Based on the following description: ${prompt} generate me an artistic image of what I entered putting your own vision of it.` })
    console.log(generated)

    res.send(generated)
});