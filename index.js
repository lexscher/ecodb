// Get the word bank scraper
const WorldBankScraper = require("./app/WorldBankScraper");
// get url
const { worldBankUrl } = require("./config");
// Dependencies
const express = require("express");
// use express
const app = express();
// Get json data
const data = require("./json/worldbank-0.json");
// use ejs
app.set("view engine", "ejs");

// set port
const port = process.env.PORT || 3000;
app.set("port", port);

// Home
app.get("/", (req, res) => {
  res.render("pages/index");
});
// GET all countries
app.get("/api/v1/countries", (req, res) => {
  res.json({ data });
});

// GET one country
app.get("/api/v1/countries/:id", (req, res) => {
  const id = req.params["id"];
  const country = data.find(country => country.id == id);
  res.json({ country });
});

// Listen, linda.
app.listen(port, () =>
  console.log(`The express app is running on port ${port}`)
);
