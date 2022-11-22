import { config } from "../config.js";
import { messageCollection } from "../services/serviceCollections.js"

export let firstTime = async (msg, conn) => {
    const { sender , pushName } = msg;

    if(await messageCollection.findOne({ userID : sender })) return 

    let messageTxt = `*Olá ${pushName}*, Você não está salvo no meu banco de dados , então posso salvar seu contato certo? , aperte em Aceito , e você podera usar meus comandos sem restrição.`

    const buttons = [
        {buttonId: '!agree', buttonText: {displayText: 'ACEITO OS TERMOS'}, type: 1},
      ]
      
      const buttonMessage = {
          text: messageTxt,
          footer: config.footer,
          buttons: buttons,
          headerType: 1
      } 

    return await conn.sendMessage(msg.from, buttonMessage, { quoted : msg})
}
