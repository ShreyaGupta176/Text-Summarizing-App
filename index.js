const express = require('express');
const app = express();
const port = 3000;
const summarizeText = require('./summarize.js');

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static('public'));

//adding endpoint for summarise
app.post('/summarize', (req, res) => {

   // TODO: handle POST /summarize request
   // get the text_to_summarize property from the request body
   const text = req.body.text_to_summarize;

   // call your summarizeText function, passing in the text from the request
   summarizeText(text)
      .then(response => {
         res.send(response); // Send the summary text as a response to the client
      })
      .catch(error => {
         console.log(error.message);
      });

});

app.post('/generateImg', async (req, res) => {
  try {
    const imageBuffer = await generateImg();
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).send('Error generating image');
  }
});
app.post('/image', (req, res) => {

   // TODO: handle POST /summarize request
   // get the text_to_summarize property from the request body
   const text = req.body.text_to_summarize;

   // call your summarizeText function, passing in the text from the request
   generateImg(text)
      .then(response => {
         res.send(response); // Send the summary text as a response to the client
      })
      .catch(error => {
         console.log(error.message);
      });

});

// Start the server
app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}/`);
});
