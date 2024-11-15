const { MongoClient } = require('mongodb');

const uri = 'your_mongodb_connection_string'; // Replace with your actual MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  await client.connect();
  console.log("Connected to MongoDB");
  return client.db('personal_development_academy'); // Replace with your database name
}

module.exports = connect;
