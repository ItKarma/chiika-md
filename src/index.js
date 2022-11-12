import  makeWASocket, {Browsers, useMultiFileAuthState } from '@adiwajshing/baileys';
const { state, saveCreds } = await useMultiFileAuthState('./src/cache_session')
import { Boom } from '@hapi/boom';

async function connectzap(){
    const conn = makeWASocket.default({
        browser: Browsers.ubuntu('Desktop'),
        auth: state,
        printQRInTerminal: true,
        browser: ['@danzok','chrome','1.0.0']
    })

    conn.ev.on('connection.update', (update) => {
        const { connection , lastDisconnect } = update;

        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error == Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)

            if(shouldReconnect) {
                connectzap()
            }

        } else if(connection === 'open') {
            console.log('opened connection')
        }

        conn.ev.on('creds.update', saveCreds)
    })

}
connectzap()