import axios from 'axios';

export default {
    run: async function (model, inputs) {
        let prediction;
        try { prediction = await this.create(model, inputs); }
        catch (e) { throw e.response.data; }
        while (!['canceled', 'succeeded', 'failed'].includes(prediction.status)) {
            await new Promise(_ => setTimeout(_, 250));
            prediction = await this.get(prediction);
        }

        return prediction.output;
    },

    async get(prediction) {
        if (prediction.prediction) return prediction.prediction;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 29000);
        const response = await axios.get(`https://replicate.com/api/models${prediction.version.model.absolute_url}/versions/${prediction.version_id}/predictions/${prediction.uuid}`, { signal: controller.signal }).then(r => r.data);
        clearTimeout(id);
        return response;
    },

    create(model, inputs) {
        const [path, version] = model.split(':');

        return axios({
            url: `https://replicate.com/api/models/${path}/versions/${version}/predictions`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ inputs })
        }).then(response => response.data);
    }
};