// require dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// require our string
const { connectionString } = require('./config')

// use express
const app = express();

// set port
const port = process.env.PORT || 3000;
app.set('port', port);

// GET all forests
app.get('/api/forests/', (req, res) => {
  res.json({ test: "Hello from '/api/forests/' route.",
connectionString });
});

// GET one forest
app.get('/api/forests/:id', (req, res) => {
  const id = req.params["id"]
  res.json({ test: `Hello from '/api/forests/${id}' route.` });
});

// Listen, linda.
app.listen(port, () =>
  console.log(`The express app is running on port ${port}`)
);
