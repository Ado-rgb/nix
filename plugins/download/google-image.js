const cheerio = require('cheerio');
const fetch = require('node-fetch');

async function googleImage(query) {
   const data = await (await fetch(`https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`, {
      headers: {
         accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
         'accept-encoding': 'gzip, deflate, br',
         'accept-language': 'es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7',
         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36'
      }
   })).text();

   const $ = cheerio.load(data);
   const pattern = /\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm;
   const matches = $.html().matchAll(pattern);

   const decodeUrl = (url) => decodeURIComponent(JSON.parse(`"${url}"`));

   return [...matches]
      .map(({ groups }) => decodeUrl(groups?.url))
      .filter(v => /.*\.(jpe?g|png)$/gi.test(v));
}

exports.default = {
   names: ['Internet'],
   tags: ['googleimage', 'gimage', 'imagen', 'image'],
   command: ['googleimage', 'gimage', 'imagen', 'image'],
   start: async (m, { conn, text, prefix, command }) => {
      if (!text) return m.reply(
         `❌ Uso incorrecto\nEjemplo: ${prefix}${command} paisaje hermoso\n\nPor favor ingresa el texto que deseas buscar en imágenes.`
      );

      const resultados = await googleImage(text);

      if (!resultados.length) return m.reply('⚠️ No se encontraron imágenes para tu búsqueda.');

      const index = Math.floor(Math.random() * resultados.length);
      const imagen = resultados[index];

      const caption =
         `🌐 *Búsqueda en Google Imágenes*\n` +
         `🔎 *Término:* ${text}\n` +
         `📌 *Fuente:* Google`;

      m.react('🔎');

      conn.sendButton(m.chat, caption, imagen, m, [
         ['Siguiente', `${prefix}${command} ${text}`]
      ]);
   },
   limit: false
};