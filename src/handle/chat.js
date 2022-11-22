import pingTools from '../commands/tools/pingCommand.js';
import sysInforTools from '../commands/tools/sysInforCommand.js';
import {config} from '../config.js'
import serialize from "../helper/serialize.js";
import fatosPlugin from '../commands/plugins/plugin_fatos.js';
import waifuPlugin from '../commands/plugins/plugin_waifu.js';
import picsPlugin from '../commands/plugins/plugin_pics.waifu.js';
import { makeMongoStore } from '../repositories/makeMongoStore.js';
import { messageCollection } from '../services/serviceCollections.js';
import { consultDb } from '../commands/clients/consultDb.js';
import { firstTime } from '../commands/theOfConduct.js';

export default async function chatHandle (m,conn) {

    const prefix = config.prefix
    const owner = config.owner
    const storeUser = await makeMongoStore(messageCollection);
    
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
                if(await firstTime(msg,conn)) return;

                pingTools(msg);
                break;

            case 'sistem':
               if(await firstTime(msg,conn)) return;

                sysInforTools(msg);
                break;

            case 'fatos':
                if(await firstTime(msg,conn)) return;

                fatosPlugin(msg,conn);
                break;

            case 'pics':
                if(await firstTime(msg,conn)) return;

                picsPlugin(msg,conn,q);
                break;

            case 'waifu':
                if(await firstTime(msg,conn)) return;

                waifuPlugin(msg,conn);
                break;

            case 'users':
                if(await firstTime(msg,conn)) return;

                consultDb(msg,conn);
                break;

            case 'agree':
                storeUser.bind(msg,conn)
                break ;

        }

    } catch (error) {

    }
}
