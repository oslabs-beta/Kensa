const mongoose = require('mongoose');
require('dotenv').config();

const MongoDB = process.env.MONGO_URI;

mongoose.connect(MongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connection opened');
  })
  .catch((err) => {
    console.log('Error: ', err);
  });

const user = new mongoose.Schema({
  usename: { type: String, required: true },
  password: { type: String, required: true }
});