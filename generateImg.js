// This is the function where the call to the API is made. Returns the summarized text as a string.

const { json } = require('body-parser');
const axios = require('axios');

async function generateImg(text) {

  let config = {
    method: 'post',
    url: 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
    },
    data:JSON.stringify({inputs:"mars"})
  };

  try {
    const response = await axios.request(config);
    return await response.arrayBuffer();
  }
  catch (error) {
    console.log(error);
  }

}

// Allows for summarizeText() to be called outside of this file

module.exports = generateImg;