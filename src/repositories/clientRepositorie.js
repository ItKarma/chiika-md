import { messageCollection } from "../services/serviceCollections.js";

let clientList = async () => {
    try {
        let consultClients = await messageCollection.find({}).toArray();
        return consultClients;

    } catch (error) {
        console.log(error)
    }
}

let consultuser = async (name) => {
    try {
        let consultUsers = await messageCollection.findOne({ userName : name}).toArray()
        console.log(consultUsers)
        return consultUsers
    } catch (error) {
        console.log(error)
    }
}


export { clientList, consultuser }