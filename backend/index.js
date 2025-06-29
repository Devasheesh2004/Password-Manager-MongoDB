const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bodyparser = require('body-parser');

dotenv.config();

const app = express();
const port = 3000;
const url = 'mongodb+srv://devasheeshupreti:<Devasheesh@123>@cluster0.peny8fm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'passdeck';

// Middleware
app.use(cors());
app.use(bodyparser.json());

let db; // Declare globally

// Connect to MongoDB and start server
MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db(dbName);
    app.listen(port, () => {
      console.log(`✅ Server running at ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });

// Routes

// GET: Fetch all passwords
app.get('/', async (req, res) => {
  try {
    const passwords = db.collection('passwords');
    const findResult = await passwords.find({}).toArray();
    res.json(findResult);
  } catch (err) {
    console.error("GET error:", err);
    res.status(500).send({ success: false });
  }
});

// POST: Save a password
app.post('/', async (req, res) => {
  try {
    const passwords = db.collection('passwords');
    const password = req.body;
    const result = await passwords.insertOne(password);
    res.send({ success: true, result });
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).send({ success: false });
  }
});

// DELETE: Delete by _id
app.delete('/', async (req, res) => {
  try {
    const passwords = db.collection('passwords');
    const { _id } = req.body;
    const result = await passwords.deleteOne({ _id: new ObjectId(_id) });
    res.send({ success: true, result });
  } catch (err) {
    console.error("DELETE error:", err);
    res.status(500).send({ success: false });
  }
});
