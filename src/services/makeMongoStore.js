
import { BufferJSON } from "@adiwajshing/baileys";

export const makeMongoStore = async (messagesCollection) => ({
  bind: (ev) => {
    ev.on('messages.upsert', async ({ messages, type }) => {
      if (type !== 'notify') return
      if(!messages[0]) return 
      
      await messagesCollection.insertMany(
        messages.map(({ message, ...rest }) => ({
          ...rest,
          message: JSON.stringify(message, BufferJSON.replacer)
        }))
      )
    })
  },
})