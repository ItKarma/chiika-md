import  makeWASocket, {Browsers, useMultiFileAuthState } from '@adiwajshing/baileys';
import P from 'pino';
import chatHandle from './handle/chat.js';
import connectionHandle from './handle/connection.js';
import { mongoClient } from './db/dbConnnection.js';
import makeMongoStore from './services/makeMongoStore.js';

const baileysCollection = mongoClient.db().collection('auth_info_baileys')
const groupsCollection = mongoClient.db().collection('groups')
const messagesCollection = mongoClient.db().collection('messages')

export default async function main(){
    const conn = makeWASocket.default({
        logger: P({ level: 'silent' }),
        browser: Browsers.ubuntu('Desktop'),
        auth: state,
        printQRInTerminal: true,
        browser: ['@danzok','chrome','1.0.0']
    })

    const { state, saveCreds } = await useMultiFileAuthState(baileysCollection)
    const store = await makeMongoStore(messagesCollection);

    conn.ev.on('creds.update', saveCreds)
    store.bind(conn.ev);

    conn.ev.on('connection.update', (update)=> {
        connectionHandle(update, conn, main);
    })

    conn.ev.on('messages.upsert', (msg) => {
        chatHandle(msg,conn);
    })

}

main()