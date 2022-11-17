import { MongoClient } from "mongodb";


let mongoClient = new MongoClient('mongodb+srv://your:your@cluster0.evxl2c8.mongodb.net/?retryWrites=true&w=majority');
mongoClient.connect().then(()=>{
    console.log('connected your database')
})


export default mongoClient;
