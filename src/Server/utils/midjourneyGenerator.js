import 'dotenv/config';

import { fetch, CookieJar } from 'node-fetch-cookies';

function sleep(milliseconds) { return new Promise(resolve => setTimeout(resolve, milliseconds)) }

export default async function midjourney(prompt, inputs = {}) {
    const sessionCookieJar = new CookieJar()

    await fetch(sessionCookieJar, "https://replicate.com/cloneofsimo/lora")

    const response1 = await fetch(sessionCookieJar, "https://replicate.com/api/models/cloneofsimo/lora/versions/fce477182f407ffd66b94b08e761424cabd13b82b518754b83080bc75ad32466/predictions", {
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
        let response2 = await fetch(sessionCookieJar, `https://replicate.com/api/models/cloneofsimo/lora/versions/fce477182f407ffd66b94b08e761424cabd13b82b518754b83080bc75ad32466/predictions/${uuid}`, { headers: { 'accept': '*/*' }, method: 'GET', mode: 'cors', credentials: 'include', body: null })

        let output = (await response2.json())?.prediction?.output
        if (output && output.length) { return output }

        await sleep(1000)
    }

    return []
}
