exports.default = {
   names: ['Tools'],
   tags: ['getpp'],
   command: ['getpp'],
   start: async (m, { conn, text, prefix, command }) => {
      if (m?.quoted?.sender) {
         m.react('🕒');
         const data = await conn.profilePictureUrl(m.quoted.sender, 'image').catch(() => 'https://qu.ax/KfPtl.jpeg');
         conn.sendFile(m.chat, data, '', m);
      } else if (text) {
         m.react('🕒');
         const num = `${text.replace(/[@\s-]/g, '').replace('+62', '62')}@s.whatsapp.net`;
         const data = await conn.profilePictureUrl(num, 'image').catch(() => 'https://qu.ax/KfPtl.jpeg');
         conn.sendFile(m.chat, data, '', m);
      } else {
         return m.reply(
            `⚠️ Debes responder a un mensaje, mencionar a alguien o escribir un número para obtener su foto de perfil.\n\n` +
            `Ejemplo: ${prefix + command} @usuario\n` +
            `O: ${prefix + command} 521XXXXXXXXXX`
         );
      }
   },
   limit: false
};