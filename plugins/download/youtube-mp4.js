const ocean = require('../../lib/src/scraper/ocean.js');

exports.default = {
  names: ['Downloader'],
  tags: ['ytmp4', 'ytmp4_1080'],
  command: ['ytmp4', 'ytv', 'ytmp4_1080', 'ytv_1080'],
  start: async (m, { conn, text, prefix, command }) => {
    if (!text) return m.reply(
      `Error: Debe ingresar un enlace válido de YouTube.\nEjemplo:\n${prefix + command} https://youtu.be/MvsAesQ-4zA`
    );

    m.react('⭐');

    const quality = (command === 'ytmp4_1080' || command === 'ytv_1080') ? 1080 : 720;

    try {
      const data = await ocean(text, 'mp4', quality);

      const caption = `☊ *Título* »${data.title}\n✏ *Calidad* » ${quality}p`;

      await conn.adReply(m.chat, caption, data.thumbnail || '', m, { showAds: true });
      await conn.sendFile(m.chat, data.link, `${data.title}.mp4`, m, {
        mimetype: 'video/mp4',
        caption
      });
    } catch (error) {
      m.reply('Error al descargar el video. Verifique que el enlace sea correcto.');
    }
  },
  premium: false
};