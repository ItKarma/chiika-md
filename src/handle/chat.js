import {config} from '../config.js'
import serialize from "../helpers/serialize.js";

export default async function chatHandle(m,conn){
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

            console.log(body)


    } catch (error) {

    }
}