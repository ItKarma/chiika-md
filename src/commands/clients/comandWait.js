

async function commandAwait (msg) {
    return msg.reply('⏳ 𝙀𝙨𝙩𝙤𝙪 𝙚𝙨𝙘𝙤𝙡𝙝𝙚𝙣𝙙𝙤.. , 𝙚𝙨𝙥𝙚𝙧𝙚 𝙥𝙤𝙧 𝙛𝙖𝙫𝙤𝙧!.')
}

async function commandAwaitSticker (msg) {
    return msg.reply('⏳ 𝙀𝙨𝙩𝙤𝙪 𝙛𝙖𝙯𝙚𝙣𝙙𝙤... , 𝙚𝙨𝙥𝙚𝙧𝙚 𝙥𝙤𝙧 𝙛𝙖𝙫𝙤𝙧!')
}

async function commandError (msg) {
    return msg.reply('❌ 𝙊𝙪𝙫𝙚 𝙪𝙢 𝙚𝙧𝙧𝙤𝙧 ,𝙚𝙣𝙩𝙚 𝙣𝙤𝙫𝙖𝙢𝙚𝙣𝙩𝙚 𝙥𝙤𝙧 𝙛𝙖𝙫𝙤𝙧, 𝙤𝙪 𝙚𝙣𝙩𝙧𝙚 𝙚𝙢 𝙘𝙤𝙣𝙩𝙖𝙩𝙤 𝙘𝙤𝙢 𝙢𝙚𝙪 𝙥𝙧𝙤𝙥𝙧𝙞𝙚𝙩á𝙧𝙞𝙤')
}

async function commandAWaitSearch (msg) {
    return msg.reply('🔍 𝘉𝘶𝘴𝘤𝘢𝘯𝘥𝘰... ,𝘌𝘴𝘱𝘦𝘳𝘦 𝘱𝘰𝘳 𝘧𝘢𝘷𝘰𝘳')
}


export { commandError , commandAwait, commandAwaitSticker, commandAWaitSearch }