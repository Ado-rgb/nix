exports.default = {
   names: ['Group Menu'],
   tags: ['expulsar'],
   command: ['kick', 'expulsar', '-', 'sacar', 'fuera'],
   start: async (m, { conn, text }) => {
      if (m?.quoted) {
         // Expulsar a la persona de un mensaje citado
         await conn.groupParticipantsUpdate(m.chat, [m.quoted.sender], "remove");
         return m.reply(`Se ha expulsado a @${m.quoted.sender.split("@")[0]} del grupo.`, { mentions: [m.quoted.sender] });
      } else if (text) {
         // Expulsar a la persona etiquetada
         const user = conn.parseMention(text);
         if (!user.length) return m.reply('Debes etiquetar a alguien para expulsarlo.');
         await conn.groupParticipantsUpdate(m.chat, [...user], "remove");
         return m.reply(`Se ha expulsado a @${user[0].split("@")[0]} del grupo.`, { mentions: [...user] });
      } else {
         return m.reply('Etiqueta o responde al mensaje de la persona que quieras expulsar.');
      }
   },
   group: true,
   admin: true
};