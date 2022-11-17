
import { BufferJSON } from "@adiwajshing/baileys";

export default async function makeMongoStore(messagesCollection){
    bind: (ev) => {
        ev.on('messages.upsert', async ({ messages, type }) => {
          if (type !== 'notify') return

          await messagesCollection.insertMany(
            messages.map(({ message, ...rest }) => ({
              ...rest,
              message: JSON.stringify(message, BufferJSON.replacer)
            }))
          )
        })
      },
}