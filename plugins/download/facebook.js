const { fbdl } = require('ruhend-scraper');

exports.default = {
   names: ['Downloader'],
   tags: ['facebook'],
   command: ['fb', 'facebook', 'fbdl'],
   start: async (m, { conn, text, prefix, command }) => {
      if (!text) return m.reply(
`❌ Por favor ingresa un enlace válido de Facebook.\nEjemplo:\n${prefix + command} https://www.facebook.com/reel/3677168492551989?mibextid=rS40aB7S9Ucbxw6v`
      );

      try {
         const { data: result } = await fbdl(text);
         const video = result.find(vid => vid.resolution === "720p (HD)") || result.find(vid => vid.resolution === "360p (SD)");

         if (!video) return m.reply('⚠️ No se encontró un video disponible en 720p ni 360p.');

         await conn.adReply(m.chat, '⏳ Descargando video de Facebook...', null, m);

         await conn.sendFile(m.chat, video.url, '', m, {
            caption: '📹 Video descargado de Facebook',
            mimetype: 'video/mp4'
         });
      } catch (error) {
         m.reply('❌ Error al descargar el video. Verifica el enlace e intenta de nuevo.');
      }
   },
   limit: false,
   premium: false
};