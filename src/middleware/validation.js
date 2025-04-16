function validationReceipt(req, res, next) {
    const{ retailer, purchaseDate, purchaseTime, items, total } = req.body;

    if( !retailer || !purchaseDate || !purchaseTime || !items || !total ) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if(!purchaseDate.match(/^\d{4}-\d{2}-\d{2}$/)){
        return res.status(400).json({ error: 'Invalid purchaseDate format. Expected YYYY-MM-DD' });
    }

  if (!retailer.match(/^[\w\s\-&]+$/)) {
    return res.status(400).json({ error: "Invalid retailer format. Please verify input." });
  }
  
  if (!purchaseDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return res.status(400).json({ error: "Invalid date format. Please verify input." });
  }
  
  // Validate time format (HH:MM)
  if (!purchaseTime.match(/^\d{2}:\d{2}$/)) {
    return res.status(400).json({ error: "Invalid time format. Please verify input." });
  }

  if(!Array.isArray(items) && items.length < 1){
     return res.status(400).json({ error: 'Items array cannot be empty' });
  }

  for(const item of items){
    if(!item.shortDescription || !item.price){
        return res.status(400).json({ error: 'All fields in items are required' });
    }
    if(!item.shortDescription.match(/^[\w\s\-&]+$/)){
        return res.status(400).json({ error: 'Invalid shortDescription format. Please verify input.' });
    }
    if(!item.price.match(/^\d+(\.\d{1,2})?$/)){
        return res.status(400).json({ error: 'Invalid price format. Please verify input.' });
    }
  }

    if(!total.match(/^\d+(\.\d{1,2})?$/)){
        return res.status(400).json({ error: 'Invalid total format. Please verify input.' });
    }

    next();
}


module.exports = {
    validationReceipt
}