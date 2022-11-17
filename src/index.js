import  makeWASocket, {Browsers, useMultiFileAuthState } from '@adiwajshing/baileys';
import P from 'pino';
import connectionHandle from './handle/connection.js';

const { state, saveCreds } = await useMultiFileAuthState('./src/sessions')

export default async function main(){
    const conn = makeWASocket.default({
        logger: P({ level: 'silent' }),
        browser: Browsers.ubuntu('Desktop'),
        auth: state,
        printQRInTerminal: true,
        browser: ['@danzok','chrome','1.0.0']
    })

    conn.ev.on('creds.update', saveCreds)

    conn.ev.on('connection.update', (update)=> {
        connectionHandle(update, conn, main);
    })
}

main()