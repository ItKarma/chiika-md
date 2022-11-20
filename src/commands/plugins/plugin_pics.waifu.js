import axiosUtils from "../../utils/axios_Utils.js";
import { config } from '../../config.js'
import randomUtils from "../../utils/category_Utils.js";
import categoryArray from '../../helper/categoryPics.js';

export default async function picsPlugin (msg,conn,category) {

    if(!category) category = randomUtils(categoryArray);
    console.log(category)
    let data = await axiosUtils(`https://api.waifu.pics/sfw/${category}`);

    if(data.data.message) return await msg.reply('nao achei a categoria que sugeriu.');

    const buttons = [
        {buttonId: '!menu', buttonText: {displayText: 'MENU'}, type: 1},
        {buttonId: `!pics ${category}`, buttonText: {displayText: 'SELF'}, type: 1},
        {buttonId: `!pics`, buttonText: {displayText: 'RANDOM'}, type: 1}
      ]
      
      const buttonMessage = {
          image: {url: data.data.url },
          caption: `*A Categoria usada foi ${category}, Se deseja usar a mesma categoria q esta aperte no botao 'self',para voltar para a escolha de pics aleatoria aperte random*`,
          footer: config.footer,
          buttons: buttons,
          headerType: 4
      }

      /* */

      return await conn.sendMessage(msg.from, buttonMessage, { quoted : msg })
}