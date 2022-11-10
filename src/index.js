import  makeWASocket, { DisconnectReason } from '@adiwajshing/baileys';

async function connectzap(){
    const sock = makeWASocket.default({

        printQRInTerminal: true
    })

}

connectzap()