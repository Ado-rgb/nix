// Creado por Ado.
const savetube = require('../../lib/src/scraper/savetube.js');
const ocean = require('../../lib/src/scraper/ocean.js');

exports.default = {
   names: ['Downloader'],
   tags: ['ytmp3'],
   command: ['ytmp3', 'yta', 'ytaudio'],
   start: async (m, { conn, text, prefix, command, Format }) => {
      if (!text) return m.reply(
`❌ Por favor ingresa el enlace de YouTube.\nEjemplo:\n${prefix + command} https://youtu.be/MvsAesQ-4zA`
      );

      m.react("🕗");

      try {
         const audio = await savetube.download(text, '144').catch(async () => await ocean(text, 'mp3'));
         const thumbnail = audio?.result?.thumbnail || audio?.thumbnail || '';

         const loadingMsg = `⏳ Descargando audio: ${audio?.result?.title || audio?.title || 'Desconocido'}`;

         await conn.adReply(m.chat, loadingMsg, thumbnail, m);

         const media = await Format.mp3(await toBuffer(audio?.result?.download || audio?.link));

         await conn.sendFile(m.chat, media, '', m, {
            mimetype: 'audio/mpeg',
            ptt: false,
            fileName: `${audio?.result?.title || audio?.title || 'audio'}.mp3`,
            caption: `🎵 ${audio?.result?.title || audio?.title || 'Audio descargado'}`
         });
      } catch (error) {
         m.reply('❌ Error al descargar el audio. Asegúrate que el enlace sea válido e intenta de nuevo.');
      }
   },
   premium: false
};