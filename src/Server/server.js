import 'dotenv/config';

import express from 'express'
const app = express();

import path from 'path';
global.__dirname = path.resolve();

import config from './config.js';

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({ apiKey: config.FOXGPT, basePath: "https://api.hypere.app" });
const openai = new OpenAIApi(configuration)

app.listen(3000, () => { console.log(`Server listening on port 3000`); });

app.use(express.static(path.join(__dirname, '/src/Web/public')));

app.get('/', (req, res) => { res.sendFile('index.html'); })

app.get('/api/generate', async (req, res) => {
    const prompt = req.query.prompt;

    const fetchImage = await openai.createImage({ prompt: `Based on the following description: ${prompt} generate me an artistic image of what I entered putting your own vision of it.` });

    const fetchText = fetchImage.data.data[0].url
    if (!fetchText || fetchText && fetchText.length <= 0 || fetchText.length === 265) { res.send('Error'); return; }

    res.send(fetchText)
});