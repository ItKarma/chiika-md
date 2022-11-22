//import { axiosUtilsPost } from "../../utils/axios_Utils.js";
import fetch from 'node-fetch'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function searchPlugin (msg, conn) {
    let buffer = await msg.download(msg);
     fs.writeFileSync('./src/commands/plugins/demo.jpg', buffer)
    let res = await fetch('https://api.trace.moe/search', {
        method: "POST",
        body: fs.readFileSync(__dirname+"/demo.jpg"),
        headers: { "Content-type": "image/jpeg" }
    })
    
    let result = await res.json()
    console.log(result)
   let messageResult =  `RESULTADO ENCONTRADO!\n\nNOME : ${result.result[0].filename}\n\nEPISODIO : ${result.result[0].episode} \n\nSEMELHANÇA : ${result.result[0].similarity}`

   return await msg.reply(messageResult)
}