const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const cors = require('cors');
const sinon = require('sinon');
const { expect } = chai;
const apiroutes = require('../routes/App.routes.js');
const { receipts } = require('../controllers/App.controller');


chai.use(chaiHttp)

const app = express();
app.use(cors());
app.use(express.json());
app.use('/receipts', apiroutes);

describe('Receipt Processor API', () => {
    let generateIdStub;

    beforeEach(() => {
        receipts.clear();
        generateIdStub = sinon.stub(require('../middleware/generateId'), 'generateId').returns('test-receipt-id');
    });

    afterEach(() => {
        generateIdStub.restore();
    });

    describe('POST /process', () => {
        it('should process the receipt and return an ID', (done) => {
            const testReceipt = {
                retailer: 'Target',
                purchaseDate: '2022-01-01',
                purchaseTime: '13:01',
                items: [
                  {
                    shortDescription: 'Mountain Dew 12PK',
                    price: '6.49'
                  },{
                    shortDescription: "Emils Cheese Pizza",
                    price: "12.25"
                  }
                ],
                total: "20.98"
              };

              chai.request(app)
                .post('/receipts/process')
                .send(testReceipt)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('id');
                    done();
                });
        })

        it('should return a 400 error for invalid receipt format', (done) => {
            const invalidReceipt = {
                retailer: 'Target',
                purchaseDate: '2022-01-01',
                purchaseTime: 'asdasd',
                items: [
                  {
                    shortDescription: 'Mountain Dew 12PK',
                    price: '6.49'
                  }
                ],
                total: "20.98"
              };

             chai.request(app)
                .post('/receipts/process')
                .send(invalidReceipt)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    done();
                });
        })
    });


    describe('GET /:id/points', () => {
        it('should return points for a valid receipt ID', (done) => {
            const testReceipt = { 
                retailer: 'Target',
                purchaseDate: '2022-01-01',
                purchaseTime: '13:01',
                items: [
                  {
                    shortDescription: 'Mountain Dew 12PK',
                    price: '6.49'
                  },{
                    shortDescription: "Emils Cheese Pizza",
                    price: "12.25"
                  }
                ],
                total: "20.98"
              };
            receipts.set('test-receipt-id', testReceipt);
              chai.request(app)
                .get('/receipts/test-receipt-id/points')
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('points');
                    expect(res.body.points).to.equal(20);
                    done();
                });
            });

        it('should return a 404 error for an invalid receipt ID', (done) => {
            chai.request(app)
                .get('/receipts/invalid-id/points')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        })
    })
})
