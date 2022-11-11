import  makeWASocket, {Browsers, useMultiFileAuthState } from '@adiwajshing/baileys';
const { state, saveCreds } = await useMultiFileAuthState('./src/cache')
import * as fs from 'fs';

async function connectzap(){
    const conn = makeWASocket.default({
        browser: Browsers.ubuntu('Desktop'),
        auth: state,
        printQRInTerminal: true,
        browser: ['@danzok','chrome','1.0.0']
    })

    
    conn.ev.on('connection.update', (update) => {
        console.log(update)
        conn.ev.on('creds.update', saveCreds)
    })
}
connectzap()