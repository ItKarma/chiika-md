import  makeWASocket, {Browsers, DisconnectReason, useSingleFileLegacyAuthState } from '@adiwajshing/baileys';
const { state, saveState } = await useSingleFileLegacyAuthState('./src/cache/auth_session-zap.json')
import * as fs from 'fs';

async function connectzap(){
    const conn = makeWASocket.default({
        browser: Browsers.ubuntu('Desktop'),
        auth: state,
        printQRInTerminal: true,
        browser: ['@danzok','chrome','1.0.0']
    })

    conn.ev.on('creds.update', saveState)
    console.log(saveState)
}

connectzap()