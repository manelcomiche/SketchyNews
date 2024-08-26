import fetch from 'node-fetch';

export default {
    run: async function (model, prompt) {
        let imageData;
        try {
            imageData = await this.create(model, prompt);
        } catch (e) {
            console.error("[ERROR: FETCH IMAGE DATA]", e);
            throw e;
        }

        // Verificar si hay un error o no se encontraron datos
        if (!imageData || imageData.error || !imageData.data) {
            console.error("[ERROR: IMAGE GENERATION FAILED]", imageData?.error || 'Unknown error');
            return null;
        }

        const finalImage = imageData.data[0].url;

        // Descargar la imagen
        const imageBuffer = await fetch(finalImage).then(res => res.arrayBuffer());
        const blob = new Blob([imageBuffer]);

        return {
            blob: blob,
            url: finalImage
        };
    },

    async create(model, prompt) {
        try {
            const response = await fetch('https://api.naga.ac/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NAGA_GPT_API}`
                },
                body: JSON.stringify({
                    model: model,
                    prompt: prompt,
                    size: "1024x1024",
                    n: 1,
                    response_format: "url"
                })
            });

            const data = await response.json();
            console.log('data', data);
            return data;
        } catch (error) {
            console.error("[ERROR: CREATE IMAGE REQUEST]", error);
            throw error;
        }
    }
};