// Get the word bank scraper
const WorldBankScraper = require('./app/WorldBankScraper');
// get url
const { worldBankUrl } = require('./config');
// Dependencies
const express = require('express');
// use express
const app = express();
// Get json data
const data = require('./json/worldbank-0.json');

// set port
const port = process.env.PORT || 3000;
app.set('port', port);

// GET all forests
app.get('/api/countries/', (req, res) => {
  res.json({ data });
});

// GET one forest
app.get('/api/countries/:id', (req, res) => {
  const id = req.params['id'];
  const country = data.find(country => country.id == id);
  res.json({ country });
});

// Listen, linda.
app.listen(port, () =>
  console.log(`The express app is running on port ${port}`)
);
