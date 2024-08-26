import 'dotenv/config';

import Fastify from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });

const openai = new OpenAI({ baseURL: process.env.OPENAI_HOST, apiKey: process.env.OPENAI_API });

fastify.register(import('@fastify/static'), { root: path.join(__dirname, '../../src/Web/public'), prefix: '/' });

fastify.get('/', async (request, reply) => { return reply.sendFile('index.html'); });

fastify.get('/api/generate', async (request, reply) => {
    try {
        const { prompt } = request.query;
        if (!prompt) { reply.status(400).send('Prompt is required'); return; }

        const fetchImage = await openai.images.generate({
            prompt: `Based on the following description: ${prompt} generate me an artistic image of what I entered putting your own vision of it.`,
            n: 1,
            size: '1024x1024',
            model: 'sdxl'
        });

        const fetchText = fetchImage.data[0].url;

        if (!fetchText || fetchText.length === 265) { reply.status(500).send('Error generating image'); return; }

        reply.send(fetchText);
    } catch (error) {
        fastify.log.error(error);
        reply.status(500).send('Internal Server Error');
    }
});

const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT });
        fastify.log.info('Server listening on port 3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();