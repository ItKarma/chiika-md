import mongoClient from "../db/dbConnnection.js"

export const collection = ({
    chatCollection: (str) => {
        return mongoClient.db().collection(str);
    },
    baileysCollection : (str) => {
        return mongoClient.db().collection(str);
    }
})