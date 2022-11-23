import {config} from '../../config.js';
import randomUtils from '../../utils/randomcategory_Utils.js';
import categoryWaifu from '../../helper/categoryWaifu.js';
import { fetchGet_Utils } from '../../utils/fetch_Utils.js'



export default async function waifuPlugin (msg,conn) {

    
    let category = randomUtils(categoryWaifu);

    let data = await fetchGet_Utils(`https://api.waifu.im/random/?selected_tags=${category}`);

    const buttons = [
        {buttonId: '!menu', buttonText: {displayText: 'MENU'}, type: 1},
        {buttonId: '!waifu', buttonText: {displayText: 'PROXIMA'}, type: 1}
      ]

      const buttonMessage = {
          image: {url: data.images[0].url },
          caption: "Quer mais imagens ?",
          footer: config.footer,
          buttons: buttons,
          headerType: 4
      }

     return await conn.sendMessage(msg.from, buttonMessage, { quoted : msg })

} 