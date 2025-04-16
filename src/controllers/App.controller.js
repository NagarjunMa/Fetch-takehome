const express = require('express');
const {generateId} = require('../middleware/generateId');
const {calculatePoints} = require('../utils/calculatePoints')


const receipts = new Map();

function receiptProcessor( req, res) {
    const id = generateId();
    receipts.set(id, req.body);
    res.status(200).json({
        id: id,
    });
}

function getPoints(req, res){
    const id = req.params.id;
    const receipt = receipts.get(id);
    if(!receipt){
        return res.status(404).json({error: 'Receipt not found'});
    }

    const points = calculatePoints(receipt);
    res.status(200).json({
        points: points,
    });
}


module.exports = {
    receipts,
    receiptProcessor,
    getPoints,
}
