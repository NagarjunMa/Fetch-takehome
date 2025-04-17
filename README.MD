# Receipt Processor API 

A Restful API for processing the receipt data and calculating points based on receipt attributes.

## Overview

This application processes digital receipts and awards points based on specific rules. It exposes endpoints to submit receipts and retrieve point calculations.

The values are stored using the "Map" data structure. The Key-Value pair to store the receipt JSON Body for the respective ID as a key.

UUID Library is used to generate the Id


### Point Calculation Rules
Points are awarded based on the following criteria:
- One point for each alphanumeric character in the retailer name
- 50 points if the total is a round dollar amount with no cents
- 25 points if the total is a multiple of 0.25
- 5 points for every two items on the receipt
- If the trimmed length of an item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer
- 6 points if the day in the purchase date is odd
- 10 points if the purchase time is between 2:00 pm and 4:00 pm

### API Endpoints

Process Receipt

**URL**: /receipts/process
**Method**: POST
**Request Body**:
**Success Response**: 200 OK

```
{
  "retailer": "Store Name",
  "purchaseDate": "YYYY-MM-DD",
  "purchaseTime": "HH:MM",
  "items": [
    {
      "shortDescription": "Item description",
      "price": "12.34"
    }
  ],
  "total": "12.34"
}
```

**Success Response**: 200 OK

```
{
  "id": "receipt-id"
}
```

Get Points

**URL**: /receipts/:id/points
**Method**: GET
**Success Response**: 200 OK
```
{
  "points": 100
}
```
**Error Response**: 404 Not Found if receipt ID doesn't exist


## Running the application

```
# Install dependencies
npm install

# Run in Development Mode
npm run dev
```

### Docker 
A Docker setup is provided for running the application in a containerized environment.
```
docker-compose up --build
```

The Application will be accessible at 
`http://localhost:3000/`

## Technologies Used
-   Node.js
-   Express.js
-   Docker


## Dependencies
- express: Web framework
- uuid: ID generation
- express-validator: Request validation 
- nodemon: Development auto-restart