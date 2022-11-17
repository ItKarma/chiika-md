import  makeWASocket, {Browsers } from '@adiwajshing/baileys';
import P from 'pino';
import chatHandle from './handle/chat.js';
import connectionHandle from './handle/connection.js';
import  mongoClient from './db/dbConnnection.js';
import { makeMongoStore } from './services/makeMongoStore.js';
import { useMongoAuthState } from './services/useMongoAuthState.js';


const baileysCollection = mongoClient.db().collection('auth_info_baileys')
const groupsCollection = mongoClient.db().collection('groups')
const messagesCollection = mongoClient.db().collection('messages')

const { state, saveCreds } = await useMongoAuthState(baileysCollection)

export default async function main(){
    const conn = makeWASocket.default({
        logger: P({ level: 'silent' }),
        browser: Browsers.baileys('Desktop'),
        auth: state,
        printQRInTerminal: true,
        browser: ['@danzok','chrome','1.0.0']
    })
    const store = await makeMongoStore(messagesCollection);

    conn.ev.on('creds.update', saveCreds)
    store.bind(conn.ev);

    conn.ev.on('connection.update', update => {
        connectionHandle(update, conn, main);
    })

    conn.ev.on('messages.upsert', msg => {
        chatHandle(msg,conn);
    })

}

main()