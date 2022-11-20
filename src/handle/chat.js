import pingTools from '../commands/tools/pingCommand.js';
import sysInforTools from '../commands/tools/sysInforCommand.js';
import {config} from '../config.js'
import serialize from "../helper/serialize.js";
import fatosPlugin from '../commands/plugins/plugin_fatos.js';
import waifuPlugin from '../commands/plugins/plugin_waifu.js';
import picsPlugin from '../commands/plugins/plugin_pics.waifu.js';

export default async function chatHandle(m,conn){
    const prefix = config.prefix
    const owner = config.owner

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
        const gcMeta = isGroup ? await conn.groupMetadata(from) : "";
        const gcName = isGroup ? gcMeta.subject : "";
        const isOwner = owner.includes(sender) || msg.isSelf;

        const str = body.startsWith(prefix) ? body : ''
        const args = str.trim().split(/ +/).slice(1);
        const q = args.join(" ");
        const isCommand = body.startsWith(prefix);
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        
        switch(command){
            case 'ping':
                pingTools(msg);
                break;

            case 'sistem':
                sysInforTools(msg);
                break;

            case 'fatos':
                fatosPlugin(msg,conn);
                break;

            case 'pics':
                picsPlugin(msg,conn,q);
                break;

            case 'waifu':
                waifuPlugin(msg,conn);
                break;
        }

    } catch (error) {

    }
}
