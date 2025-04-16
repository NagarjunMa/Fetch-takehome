function calculatePoints(receipt) {
    let points = 0;
    const { retailer, purchaseDate, purchaseTime, items, total } = receipt;
    
    points += retailer.replace(/[^a-z0-9]/gi, '').length;
    
    if (parseFloat(total).toFixed(2).endsWith('.00')) {
      points += 50;
    }
    
    if (parseFloat(total) % 0.25 === 0) {
      points += 25;
    }
    
    points += Math.floor(items.length / 2) * 5;

    
    for (const item of items) {
      const trimmedDesc = item.shortDescription.trim();
      if (trimmedDesc.length % 3 === 0) {
        points += Math.ceil(parseFloat(item.price) * 0.2);
      }
    }
    

    const day = parseInt(purchaseDate.split('-')[2]);
    if (day % 2 === 1) {
      points += 6;
    }

    
    const hour = parseInt(purchaseTime.split(':')[0]);
    const minute = parseInt(purchaseTime.split(':')[1]);
    if ((hour === 14 && minute > 0) || hour === 15) {
      points += 10;
    }
    
    return points;
  }
  
  module.exports = {
    calculatePoints
  };