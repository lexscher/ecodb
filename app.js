// get file adapter
const FileAdapter = require('./app/FileAdapter');
// Get the word bank scraper
const WorldBankScraper = require('./app/WorldBankScraper');
// get url
const { worldBankUrl } = require('./config');

// Create a new instance of the class
const worldBankLandUse = new WorldBankScraper(worldBankUrl);

// Write our data into the ./json folder
worldBankLandUse
  .makeJson()
  .catch(err => console.error(err.stack));


