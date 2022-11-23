import { writeExifImg } from '../../helper/exifWebp.js';
import fs from 'fs';

async function stickerPlugin (msg, conn) {
    const { pushName } = msg;

    const imageBuffer = await msg.download(msg);
    
    let stickerBuffer = await writeExifImg(imageBuffer, { 
        packname : "⭐ github.com/danzok" , 
        author: `👤 ${pushName}` })

    await conn.sendMessage(msg.from, { sticker : { url : stickerBuffer } }  ,{ quoted : msg} )

    return  fs.unlinkSync(stickerBuffer)
}

export { stickerPlugin }