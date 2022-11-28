import { writeExifImg } from '../../helper/exifWebp.js';
import fs from 'fs';

async function stickerPlugin (msg, conn) {
    const { pushName } = msg;

    const imageBuffer = await msg.download(msg);
    
    let stickerBuffer = await writeExifImg(imageBuffer, { 
        packname : `👾 𝙂𝙧𝙪𝙥𝙤 
        ↳ _ https://t.ly/PmOU` , 
        author: `😎 𝐟𝐞𝐢𝐭𝐨 𝐩𝐨𝐫
        ↳ _ ${pushName}` })

    await conn.sendMessage(msg.from, { sticker : { url : stickerBuffer } }  ,{ quoted : msg} )

    return  fs.unlinkSync(stickerBuffer)
}

export { stickerPlugin }