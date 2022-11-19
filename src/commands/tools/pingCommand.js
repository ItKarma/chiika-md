import pingUtils from "../../utils/ping_Utils.js";

export default function pingTools (msg) {
    msg.reply(`*PONG!*\n*_${pingUtils(msg.messageTimestamp, Date.now())} second(s)_*`);
}