import { config } from "../../config.js";
import { clientList } from "../../repositories/clientRepositorie.js";

export  async function consultDb (msg, conn) {
    let dbConsult = await clientList();
    let msgDb = '';

     dbConsult.map((value)=>{
        return msgDb +=  `numero : ${value.userID} name : ${value.userName}`
    })

    console.log(msgDb)
    const buttons = [
        {buttonId: 'menu', buttonText: {displayText: 'menu'}, type: 1},
      ]
      
      const buttonMessage = {
          text: msgDb,
          footer: config.footer,
          buttons: buttons,
          headerType: 1
      }

    return await conn.sendMessage(msg.from,buttonMessage, { quoted : msg} )
}