import { config } from '../../config.js';

export async function menuCommand (msg, conn) {

    let templateMessage = `☰ \`\`\` MENU \`\`\`

♺ date :

❏ ${config.prefix}sticker [ _reply midia_ ]
└ _envie-me um video/image com o comando na  legenda_

❏ ${config.prefix}sauce [ _reply midia_ ]
└ _envie-me um video/image com o comando na  legenda_

❏ ${config.prefix}waifu [ ]
└ _envie-me apenas o comando e irei lhe enviar uma imagen random_

❏ ${config.prefix}fatos
└ _envie-me apenas o comando e irei lhe enviar um fato random_

❏ ${config.prefix}report [ _reason_ ]
└ _avise-me meu dono sobre bugs etc.._

☰ \`\`\`Information\`\`\`
✆ developer : _danzok.dev_`

const buttons = [
    {buttonId: '!repo', buttonText: {displayText: 'My repo'}, type: 1},
    {buttonId: `!dev`, buttonText: {displayText: 'Contact developer'}, type: 1},
]
      
      const buttonMessage = {
          image: {url: 'https://telegra.ph/file/53f5d97b8fbe3535d4485.png' },
          caption: templateMessage ,
          footer: config.footer,
          buttons: buttons,
          headerType: 4
      }

      /* */

      return await conn.sendMessage(msg.from, buttonMessage, { quoted : msg })
   


}