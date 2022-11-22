import { MongoClient } from "mongodb";
import 'dotenv/config';


let mongoClient = new MongoClient(process.env.URL_MONGO);
mongoClient.connect()
.then(() => console.log('connected your database'))
    .catch(error => console.log(error));

export default mongoClient;
