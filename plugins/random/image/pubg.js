exports.default = {
   names: ['Image'],
   tags: ['pubg'],
   command: ['pubg'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/pubg.json');
      const pubg = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, pubg, {
         caption: '𝐏𝐔𝐁𝐆',
         quoted: m
      })
   },
   limit: true
}