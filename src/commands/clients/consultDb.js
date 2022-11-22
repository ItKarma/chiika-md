import { config } from "../../config.js";
import { clientList, consultuser } from "../../repositories/clientRepositorie.js";

async function consultDb (msg, conn) {
    let dbConsult = await clientList();
    let msgDb = '';

     dbConsult.map((value)=>{
        return msgDb +=  `👤 NOME : ${value.userName} \n🔢 NUMERO : ${value.userID} \n\n`
    })

    const buttons = [
        {buttonId: '!menu', buttonText: {displayText: 'MENU'}, type: 1},
      ]
      
      const buttonMessage = {
          text: msgDb,
          footer: config.footer,
          buttons: buttons,
          headerType: 1
      }

    return await conn.sendMessage(msg.from,buttonMessage, { quoted : msg} )
}

async function consultUser (name,msg,conn) {

    let ConsultUser = await consultuser(name)

    let msgDb = '';

     ConsultUser?.map((value)=>{
        return msgDb +=  `👤 NOME : ${value.userName} \n🔢 NUMERO : ${value.userID} \n\n`
    })
    const buttons = [
        {buttonId: '!menu', buttonText: {displayText: 'MENU'}, type: 1},
      ]
      
      const buttonMessage = {
          text: msgDb,
          footer: config.footer,
          buttons: buttons,
          headerType: 1
      }

    return await conn.sendMessage(msg.from,buttonMessage, { quoted : msg} )
}


export { consultUser, consultDb }