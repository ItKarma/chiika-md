import  makeWASocket, {Browsers } from '@adiwajshing/baileys';
import P from 'pino';
import chatHandle from './handle/chat.js';
import connectionHandle from './handle/connection.js';
import { useMongoAuthState } from './repositories/useMongoAuthState.js';
import { baileysCollection } from './services/serviceCollections.js';

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