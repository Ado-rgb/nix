exports.default = {
  names: ['Downloader'],
  tags: ['pinterest'],
  command: ['pinterest', 'pin'],
  start: async (m, { conn, text, prefix, command, Format }) => {
    if (!text) return m.reply(`❌ Uso incorrecto\nEjemplo: ${prefix + command} paisaje hermoso`);

    const images = await Format.Scraper.pinterest(text);
    if (images.length === 0) return m.reply('⚠️ No se encontraron resultados para tu búsqueda.');

    await m.reply('⏳ Buscando imágenes en Pinterest...');

    const caption =
      `📌 *PINTEREST*\n` +
      `🔎 Resultados para: ${text}`;

    conn.sendButton(m.chat, caption, pickRandom(images), m, [
      ['Siguiente', `${prefix}${command} ${text}`]
    ]);
  },
  limit: 2,
  premium: false
};