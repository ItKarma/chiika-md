import axios from "axios";
import { config } from "dotenv";


export default async function fatosRandom (msg, conn) {
    let { data } = await axios.get('https://apis-geek.vercel.app/fatosRandom');
    let buttons = [
        { quickReplyButton: { displayText: "proximo ➡️", id: `fatos` } },
    ];

    return await conn.sendMessage(msg.from, {
        text : data.data,
        templateButtons: buttons,
        footer: config.footer
    }, { quoted : msg });
}