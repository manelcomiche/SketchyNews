import 'dotenv/config';

import { fetch, CookieJar } from 'node-fetch-cookies';

function sleep(milliseconds) { return new Promise(resolve => setTimeout(resolve, milliseconds)) }

export default async function midjourney(prompt, inputs = {}) {
    const sessionCookieJar = new CookieJar()

    await fetch(sessionCookieJar, process.env.COOKIE_FETCH_URL)

    const response1 = await fetch(sessionCookieJar, process.env.PREDICTIONS_URL, {
        headers: { 'content-type': 'application/json', 'accept': 'application/json', 'x-csrftoken': sessionCookieJar.cookies.get('csrftoken') },
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
            inputs: {
                guidance_scale: '7',
                width: 512,
                height: 512,
                num_inference_steps: 50,
                num_outputs: 1,
                seed: null,
                prompt,
                ...inputs,
            },
        }),
    })

    const uuid = (await response1.json()).uuid

    for (let timeoutCounter = 0; timeoutCounter < 10; timeoutCounter++) {
        let response2 = await fetch(sessionCookieJar, `${process.env.PREDICTIONS_URL}/${uuid}`, { headers: { 'accept': '*/*' }, method: 'GET', mode: 'cors', credentials: 'include', body: null })

        let output = (await response2.json())?.prediction?.output
        if (output && output.length) { return output }

        await sleep(1000)
    }

    return []
}
