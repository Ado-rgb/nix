exports.default = {
   names: ['Image'],
   tags: ['cosplay'],
   command: ['cosplay'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/cosplay.json');
      const cosplay = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, cosplay, {
         caption: '𝐂𝐎𝐒𝐏𝐋𝐀𝐘',
         quoted: m
      })
   },
   limit: true
}