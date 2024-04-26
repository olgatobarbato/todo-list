import mongoose from "mongoose";
import { MongoClient } from "mongodb";

let client;
let clientPromise;
const connection = {};

//la funzione deve essere asincrona perchè il database sarà più lento
async function dbConnection() {
  if (connection.isConnected) {
    return; //questo per renderlo imperativo
  }

  //MongoDB connection
  //primo check se la connessione non va a buon fine
  if (!process.env.MONGODB_URI) {
    throw new Error("Add your Mongo DB uri to env file!");
  }

  //creazione del client che utilizzerà una funzione di Mongo
  client = new MongoClient(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
  });

  clientPromise = client.connect();
  await clientPromise;

  //Mongoose connection
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
  });

  connection.isConnected = db.connection.readyState;

  if (connection.isConnected) {
    console.log("MongoSb connected successfully");
  } else {
    console.log("MongoDB conncetion failed!");
  }
}

export default dbConnection;

//l'esportazione di client e clientPromise è per uso esterno
export { client, clientPromise };
