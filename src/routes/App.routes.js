const express = require('express');
const { validationReceipt } = require('../middleware/validation');
const { receiptProcessor, getPoints } = require('../controllers/App.controller');
const router = express.Router();
console.log('App.routes.js loaded');

//testing
router.get('/', (req, res) => {
    console.log('GET /');
    res.send('Welcome to the API');
});

router.get('/:id/points', getPoints);

router.post('/process' , validationReceipt, receiptProcessor);


module.exports = router;