import axios from "axios";
import { config } from "../../config.js";


export default async function fatosPlugin (msg, conn) {
    let { data } = await axios.get('https://apis-geek.vercel.app/fatosRandom');
    let buttons = [
        { quickReplyButton: { displayText: "MENU ☰ ", id: `!menu` } },
        { quickReplyButton: { displayText: "PRÓXIMO ➡️", id: `!fatos` } }
    ];

    return await conn.sendMessage(msg.from, {
        text : data.data,
        templateButtons: buttons,
        footer: config.footer
    }, { quoted : msg });
}
