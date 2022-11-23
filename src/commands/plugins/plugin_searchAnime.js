import fetch from 'node-fetch';

export default async function searchPlugin (msg, conn) {
    let buffer = await msg.download(msg);

    let data = await fetch('https://api.trace.moe/search', {
        method: "POST",
        body: buffer,
        headers: { "Content-type": "image/jpeg" }
    })

    let res = await data.json();

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