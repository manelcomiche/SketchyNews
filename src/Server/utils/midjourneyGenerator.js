import 'dotenv/config';

import { fetch, CookieJar } from 'node-fetch-cookies';

function sleep(milliseconds) { return new Promise(resolve => setTimeout(resolve, milliseconds)) }

export default async function midjourney(prompt, inputs = {}) {
    const sessionCookieJar = new CookieJar()

    await fetch(sessionCookieJar, "https://replicate.com/stability-ai/stable-diffusion")

    const response1 = await fetch(sessionCookieJar, "https://replicate.com/api/models/stability-ai/stable-diffusion/versions/db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf/predictions", {
        headers: { 'content-type': 'application/json', 'accept': 'application/json', 'x-csrftoken': sessionCookieJar.cookies.get('csrftoken') },
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
            inputs: {
                guidance_scale: '7',
                image_dimensions: "512x512",
                num_inference_steps: 50,
                num_outputs: 1,
                seed: null,
                prompt,
                ...inputs,
            },
        }),
    });

    console.log(response1)

    const uuid = (await response1.json()).uuid
    console.log(uuid)

    for (let timeoutCounter = 0; timeoutCounter < 10; timeoutCounter++) {
        let response2 = await fetch(sessionCookieJar, `https://replicate.com/api/models/stability-ai/stable-diffusion/versions/db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf/predictions/${uuid}`, { headers: { 'accept': '*/*' }, method: 'GET', mode: 'cors', credentials: 'include', body: null })

        let output = (await response2.json())?.prediction?.output
        if (output && output.length) { return output }

        await sleep(1000)
    }

    return []
}