import {axiosUtils} from '../../utils/axios_Utils.js';
import {config} from '../../config.js';


export default async function waifuPlugin (msg,conn) {

    let data = await axiosUtils(`https://api.waifu.pics/sfw/waifu`);

    const buttons = [
        {buttonId: '!menu', buttonText: {displayText: 'MENU'}, type: 1},
        {buttonId: '!waifu', buttonText: {displayText: 'PROXIMA'}, type: 1}
      ]
      
      const buttonMessage = {
          image: {url: data.data.url },
          caption: "Quer mais imagens ?",
          footer: config.footer,
          buttons: buttons,
          headerType: 4
      }

      return await conn.sendMessage(msg.from, buttonMessage, { quoted : msg })
      
} 