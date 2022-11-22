import { config } from "../config.js";
import { messageCollection } from "../services/serviceCollections.js"

export let firstTime = async (msg, conn) => {
    const { sender , pushName } = msg;

    if(await messageCollection.findOne({ userID : sender })) return 

    let messageTxt = `*Ola ${pushName}*, Percebi que vc nao esta salvo no nosso banco de dados , entao posso salvar seu contato certo? , aperte em concordo , e podera usar meus comandos sem restriçao.`

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