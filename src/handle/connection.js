import { DisconnectReason } from "@adiwajshing/baileys";
import { Boom } from '@hapi/boom';



export default async function connectionHandle(update,conn,main){
    try {
        const { connection, lastDisconnect } = update;
        if(connection == "open"){
            console.log('Conncetion open')
        }
        if (connection === "close") {
            let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            if (reason === DisconnectReason.badSession) {
                console.log(`Bad Session File, Please Delete path session and Scan Again`);
                conn.logout();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log("Connection closed, reconnecting....");
                main()
            } else if (reason === DisconnectReason.connectionLost) {
                console.log("Connection Lost from Server, reconnecting...");
                main();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
                 conn.logout();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(`Device Logged Out, Please Delete sessions and Scan Again.`);
                conn.logout();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log("Restart Required, Restarting...");
                main();
            } else if (reason === DisconnectReason.timedOut) {
                console.log("Connection TimedOut, Reconnecting...");
                main();
            } else {
                let reason = new Error("Unknown Reason");
                conn.end(reason);
            }
        }
    } catch (error) {
        console.log(error);
    }
}