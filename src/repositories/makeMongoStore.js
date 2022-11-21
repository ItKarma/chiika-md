export const makeMongoStore = async (messagesCollection) => ({
  bind: async (msg) => {

       let { sender,pushName } = msg

     await messagesCollection.insertMany([ {
      userID : sender,
      userName: pushName,
     }]);

  },
})