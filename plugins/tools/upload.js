exports.default = {
   names: ['Tools'],
   tags: ['tourl', 'upload'],
   command: ['tourl', 'upload'],
   start: async (m, { conn, prefix, command, mime, quoted, Format }) => {
      if (/image|video|audio|webp/.test(mime)) {
         m.reply('⏳ Subiendo tu archivo...');
         const result = await Format.upload2(await conn.download(quoted));
         const caption = `✅ Subida exitosa\n${result}`;
         return conn.adReply(m.chat, caption, cover, m);
      } else {
         return m.reply(`⚠️ Responde a un archivo multimedia o envía uno con el comando ${prefix}upload o ${prefix}tourl`);
      }
   },
   limit: false,
   register: false,
   premium: false
};