const express = require('express');
const apiroutes = require('./routes/App.routes.js');

const app = express();

app.use(express.json());

// Add direct test route
app.get('/test', (req, res) => {
  res.send('Test route working!');
});

app.use('/receipts', apiroutes);


module.exports = app;