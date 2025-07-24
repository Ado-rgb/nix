const search = require("yt-search");
const savetube = require('../../lib/src/scraper/savetube.js');
const ocean = require('../../lib/src/scraper/ocean.js');

exports.default = {
   names: ['Downloader'],
   tags: ['play', 'song', 'canción'],
   command: ['play', 'song', 'canción'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(
`❌ *Error:* Debes poner el nombre de la canción.`
      );

      let data = await search(text);
      let url = data.videos[0];
      let link = url.url;
      let thumb = `https://i.ytimg.com/vi/${url.videoId}/0.jpg`;
      let result = '';

      result += `🎧 〔 𝙋𝙇𝘼𝙔 〕\n\n`;
      result += `🔹 *Título:* ${url.title}\n`;
      result += `⏱ *Duración:* ${url.timestamp}\n`;
      result += `👁 *Vistas:* ${url.views.toLocaleString()}\n`;
      result += `📺 *Canal:* ${url.author.name}\n`;
      result += `🔗 *Link del canal:* ${url.author.url}\n`;
      result += `🔗 *URL del video:* ${url.url}\n\n`;
      result += `⏳ *Cargando audio, espera un momento...*`;

      const audio = await savetube.download(link, '144').catch(async () => await ocean(link, 'mp3'));
      conn.adReply(m.chat, result, audio?.result?.thumbnail || audio?.thumbnail || thumb, m);

      const pretty = await Format.mp3Play(await toBuffer(audio?.result?.download || audio?.link));
      conn.sendFile(m.chat, pretty, `${url.title}.mp3`, m, {
         contextInfo: {
            externalAdReply: {
               mediaType: 2,
               mediaUrl: link,
               title: url.title,
               body: setting.botName || 'Bot',
               sourceUrl: url.url,
               thumbnail: await toBuffer(thumb)
            }
         }
      });
   }
};