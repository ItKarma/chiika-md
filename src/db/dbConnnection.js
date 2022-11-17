import { MongoClient } from "mongodb";

export default async function MongoConnection(uriMongo){
    if(!uriMongo) throw new Error('uriMongo is required')

    try {
        const mongoClient = new MongoClient(uriMongo);
        await mongoClient.connect();
        console.log(' Connected your database!')
        return mongoClient;
    } catch (error) {
        console.log(error);
    }
}