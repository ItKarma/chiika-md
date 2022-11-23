import { config } from '../../config.js';
import randomUtils from "../../utils/randomcategory_Utils.js";
import categoryArray from '../../helper/categoryPics.js';
import { fetchGet_Utils } from '../../utils/fetch_Utils.js';

export default async function picsPlugin (msg,conn,category) {

    if(!category) category = randomUtils(categoryArray);
    
    let data = await fetchGet_Utils(`https://api.waifu.pics/sfw/${category}`);

    if(data.message) return await msg.reply('Não achei a categoria que sugeriu.');

    const buttons = [
        {buttonId: '!menu', buttonText: {displayText: 'MENU'}, type: 1},
        {buttonId: `!pics ${category}`, buttonText: {displayText: 'SELF'}, type: 1},
        {buttonId: `!pics`, buttonText: {displayText: 'RANDOM'}, type: 1}
      ]
      
      const buttonMessage = {
          image: {url: data.url },
          caption: `*A Categoria usada foi ${category}, Se deseja usar a mesma categoria que esta aperte no botão 'SELF', para voltar a escolha de pics aleatória aperte RANDOM*`,
          footer: config.footer,
          buttons: buttons,
          headerType: 4
      }

      /* */

      return await conn.sendMessage(msg.from, buttonMessage, { quoted : msg })
}
