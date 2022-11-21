import { messageCollection } from "../services/serviceCollections.js";

let clientList = async () => {
    try {
        let consultClients = await messageCollection.find({}).toArray();
        return consultClients;

    } catch (error) {
        console.log(error)
    }
}

export { clientList }