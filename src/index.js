import  makeWASocket, {Browsers, useMultiFileAuthState , DisconnectReason} from '@adiwajshing/baileys';
const { state, saveCreds } = await useMultiFileAuthState('./src/cache_session')
import { Boom } from '@hapi/boom';
import P from 'pino';

async function connectzap(){
    const conn = makeWASocket.default({
        logger: P({ level: 'silent' }),
        browser: Browsers.ubuntu('Desktop'),
        auth: state,
        printQRInTerminal: true,
        browser: ['@danzok','chrome','1.0.0']
    })

    console.log(state)
    conn.ev.on('creds.update', saveCreds)
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
    })

     conn.ev.on('messages.upsert', async (m)  =>{
        try {
            const fromId = m.messages[0].key.remoteJid
            await conn.sendMessage(fromId, { text: 'Hello there!' })
        } catch (error) {
            console.log(error)
        }
     })

}
connectzap()