import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function searchPlugin (msg, conn) {
    let buffer = await msg.download(msg);
     fs.writeFileSync('./src/commands/plugins/demo.jpg', buffer)
    let data = await fetch('https://api.trace.moe/search', {
        method: "POST",
        body: fs.readFileSync(__dirname+"/demo.jpg"),
        headers: { "Content-type": "image/jpeg" }
    })

    let res = await data.json();

    //fs.unlinkSync(__dirname+"/demo.jpg");

   let messageResult =  `*RESULTADO*\n\n*NOME*: ${res.result[0].filename}\n*EPISODIO* : ${res.result[0].episode} \n*SEMELHANÇA* : ${res.result[0].similarity}`

  return await conn.sendMessage(
    msg.from, 
    { 
        video: { url : `${res.result[0].video}` }, 
        caption: messageResult,
        gifPlayback: true
    }
     )
}