import { messageCollection } from "../services/serviceCollections.js";

export const makeMongoStore = async (messagesCollection) => ({
  bind: async (msg) => {

       let { sender,pushName } = msg
      if(await messageCollection.findOne({ userID : sender })) return 
       

     await messagesCollection.insertMany([ {
      userID : sender,
      userName: pushName,
     }]);

  },
})