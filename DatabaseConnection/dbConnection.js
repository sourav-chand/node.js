const { MongoClient } = require('mongodb');
const dbConnectionurl = `mongodb://localhost:27017`;
const client = new MongoClient(dbConnectionurl);
let dbConnection = async () => {
  await client.connect();
  let mydb = client.db('mydb');
  return mydb;
};
module.exports = { dbConnection };