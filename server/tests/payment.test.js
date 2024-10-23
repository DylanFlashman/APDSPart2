const mongoose = require('mongoose');
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index.js'); // Assuming you export the Express app from server.js
const Payment = require('../models/payment');
const User = require('../models/user'); 

let mongoServer;
let request;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
  
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }
  
    // Initialize Supertest with the Express app
    request = supertest(app);
});

afterAll(async () => {
    // Close MongoDB connection and stop the in-memory server
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    // Clean up the database between tests
    await Payment.deleteMany({});
    await User.deleteMany({});
  });

  describe('Payment Model and API', () => {
    test('should create a new payment in the database', async () => {
      // Mock user creation (if a user is required for the payment)
      const user = new User({ 
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123' 
      });
      await user.save();
  
      const paymentData = {
        customerId: user._id, // use the user ID
        amount: 1000,
        currency: 'USD',
        accountNumber: '123456789',
        swiftCode: 'ABC12345',
        reference: 'Ref123'
      };
  
      const res = await request.post('/api/payment')
        .send(paymentData)
        .expect(200);
  
      expect(res.body.message).toBe('Payment submitted successfully');
      expect(res.body.payment).toHaveProperty('_id');
      expect(res.body.payment.amount).toBe(1000);
      expect(res.body.payment.currency).toBe('USD');
    });

    test('should not create a payment with an existing swift code', async () => {
        const paymentData = {
          customerId: new mongoose.Types.ObjectId(), // mock customer ID
          amount: 1500,
          currency: 'EUR',
          accountNumber: '987654321',
          swiftCode: 'DEF67890',
          reference: 'Ref456'
        };
    
        // Create the first payment
        const payment = new Payment(paymentData);
        await payment.save();
    
        // Attempt to create a payment with the same swift code
        const res = await request.post('/api/payment/')
          .send(paymentData)
          .expect(200);
    
        expect(res.body.error).toBe('Swift Code already exists');
      });
    });