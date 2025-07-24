exports.default = {
   names: ['Tools'],
   tags: ['ssweb'],
   command: ['ssweb', 'ss'],
   start: async (m, { conn, text, prefix, command }) => {
      if (!text) return m.reply(
         `⚠️ Debes ingresar un enlace para hacer la captura.\n` +
         `Ejemplo: ${prefix + command} https://ejemplo.com`
      );

      await m.reply('⏳ Capturando la página, espera un momento...');
      await conn.sendFile(
         m.chat,
         await BUFFER_URL(`https://image.thum.io/get/width/1900/crop/1000/fullpage/${text}`),
         text,
         m
      );
   },
   limit: false
};