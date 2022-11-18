import {config} from '../config.js'
import serialize from "../helper/serialize.js";

export default async function chatHandle(m,conn){
    const prefix = config.prefix
    const owner = config.owner
    const multiPref = new RegExp("^[" + "!#".replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + "]");

    try {
        if (m.type !== "notify") return;
        let msg = serialize(JSON.parse(JSON.stringify(m.messages[0])), conn);
        if (!msg.message) return;
        if (msg.key && msg.key.remoteJid === "status@broadcast") return;
        if (
            msg.type === "protocolMessage" ||
            msg.type === "senderKeyDistributionMessage" ||
            !msg.type ||
            msg.type === ""
        )
            return;

        let { body } = msg;
        const { isGroup, sender, from } = msg;
        const gcMeta = isGroup ? await sock.groupMetadata(from) : "";
        const gcName = isGroup ? gcMeta.subject : "";
        const isOwner = owner.includes(sender) || msg.isSelf;

        if(body == 'ping'){
           msg.reply('texto')
        }

    } catch (error) {

    }
}
