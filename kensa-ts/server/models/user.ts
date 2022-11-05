import mongoose, { Document, Schema } from 'mongoose';

// Create interface representing a document in MongoDb
export interface IUser {
  username: string,
  password: string
}


// connecting to mongo database
// const URI:string = 'mongodb+srv://kensa:graphqlA@cluster0.usanabx.mongodb.net/?retryWrites=true&w=majority';
