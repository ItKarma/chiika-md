import  makeWASocket, {Browsers } from '@adiwajshing/baileys';
import P from 'pino';
import chatHandle from './handle/chat.js';
import connectionHandle from './handle/connection.js';
import { collection } from './services/collection.js';
import { useMongoAuthState } from './services/useMongoAuthState.js';


const baileysCollection = collection.baileysCollection('infor_connection');

const { state, saveCreds } = await useMongoAuthState(baileysCollection)

export default async function main(){

    const conn = makeWASocket.default({
        logger: P({ level: 'silent' }),
        browser: Browsers.baileys('Desktop'),
        auth: state,
        printQRInTerminal: true,
        browser: ['@danzok','chrome','1.0.0']
    })

    conn.ev.on('creds.update', saveCreds)

    conn.ev.on('connection.update', update => {
        connectionHandle(update, conn, main);
    })

    conn.ev.on('messages.upsert', msg => {
        chatHandle(msg,conn);
    })

}

main()