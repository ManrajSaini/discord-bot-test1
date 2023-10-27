const axios = require("axios");

async function getMeme(){
    const res = await axios.get('https://meme-api.com/gimme');

    const imgUrl = res.data.url;

    return imgUrl;
}

module.exports = getMeme;