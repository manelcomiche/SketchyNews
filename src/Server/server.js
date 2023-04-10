import 'dotenv/config';

import express from 'express'
const app = express();

import replicate from "node-replicate"

import path from 'path';
global.__dirname = path.resolve();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

app.use(express.static(path.join(__dirname, '/src/Web/public')));

app.get('/', (req, res) => { res.sendFile('index.html'); })

app.get('/api/generate', async (req, res) => {
    const prompt = req.query.prompt;

    const generated = await replicate.run("stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf", { prompt: `Based on the following description: ${prompt} generate me an artistic image of what I entered putting your own vision of it.` })

    res.send(generated)

    console.log(generated)
});