const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Use MongoDB URI from environment variable
const mongoUrl = process.env.MONGO_URL;
const dbName = 'passdeck_DB';

let db;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection (with TLS compatibility fix for Render)
MongoClient.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tlsAllowInvalidCertificates: true  // ✅ Fix for Render's TLS/SSL issue
})
  .then(client => {
    db = client.db(dbName);
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
  });

// Routes

// GET all passwords
app.get('/', async (req, res) => {
  try {
    const passwords = db.collection('passwords');
    const result = await passwords.find({}).toArray();
    res.json(result);
  } catch (err) {
    console.error('GET error:', err);
    res.status(500).send({ success: false });
  }
});

// POST a new password
app.post('/', async (req, res) => {
  try {
    const passwords = db.collection('passwords');
    const password = req.body;
    const result = await passwords.insertOne(password);
    res.send({ success: true, result });
  } catch (err) {
    console.error('POST error:', err);
    res.status(500).send({ success: false });
  }
});

// DELETE by _id
app.delete('/', async (req, res) => {
  try {
    const passwords = db.collection('passwords');
    const { _id } = req.body;
    const result = await passwords.deleteOne({ _id: new ObjectId(_id) });
    res.send({ success: true, result });
  } catch (err) {
    console.error('DELETE error:', err);
    res.status(500).send({ success: false });
  }
});
