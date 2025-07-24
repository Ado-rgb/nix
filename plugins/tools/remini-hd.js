exports.default = {
   names: ['Tools'],
   tags: ['remini', 'hd'],
   command: ['remini', 'hd', 'hdr'],
   start: async (m, { conn, text, prefix, command, mime, quoted, Format, isPremium }) => {
      if (/image|webp/.test(mime) || m.mtype === 'imageMessage' || m.mtype === 'stickerMessage') {
         if (!m.isGroup && !isPremium)
            return m.reply('⚠️ Esta función HD en chats privados solo está disponible para usuarios premium.');
         
         if (m.isGroup && !db.chats[m.chat].hd)
            return conn.reply(
               m.chat,
               '⚠️ La función HD está desactivada para este grupo.\nPara activarla usa: *.on hd*',
               m,
               { contextInfo: { mentionedJid: [...setting.ownerNumber, setting.botNumber].map(num => `${num}@s.whatsapp.net`) } }
            );

         m.react('🕒');
         const media = await conn.download(quoted);
         const tmp = await Format.upload4(media);
         const data = await toJSON(`https://fastapi.alifproject.cloud/api/ai/upscalev2?url=${tmp}`);
         m.reply('⏳ Mejorando tu imagen, por favor espera...');
         conn.sendFile(m.chat, await toBuffer(data.data.result_url), '✅ Imagen mejorada con éxito', m);
      } else {
         return m.reply(`⚠️ Responde o envía una imagen con el comando *${prefix + command}* para mejorarla.`);
      }
   },
   limit: false,
   disable: false
};