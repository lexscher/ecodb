// Dependencies
const express = require('express');

// use express
const app = express();

// set port
const port = process.env.PORT || 3000;
app.set('port', port);

// GET all forests
app.get('/api/forests/', (req, res) => {
  res.json({ test: "Hello from '/api/forests/' route." });
});

// GET one forest
app.get('/api/forests/:id', (req, res) => {
  const id = req.params['id'];
  res.json({ test: `Hello from '/api/forests/${id}' route.` });
});

// Listen, linda.
app.listen(port, () =>
  console.log(`The express app is running on port ${port}`)
);
