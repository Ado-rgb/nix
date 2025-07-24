exports.default = {
   names: ['Tools'],
   tags: ['delete'],
   command: ['delete', 'del', 'd'],
   start: async (m, { conn }) => {
      if (!m.quoted) return m.reply('Responde al mensaje que quieres borrar.');
      await conn.removeMessage(m);
   },
   premium: true
};