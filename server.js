const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');  // Corrected line
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/proxy', async (req, res) => {
  try {
    const imageUrl = (req.query.url);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    
    res.setHeader('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching image:', error.message); // Log the error message
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at [http://localhost:${port}](http://localhost)`);
});
