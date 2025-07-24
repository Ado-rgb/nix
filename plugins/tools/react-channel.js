exports.default = {
   names: ['Tools'],
   tags: ['reactch'],
   command: ['reactch', 'rch'],
   start: async (m, { conn, text, prefix, command }) => {
      if (!text) {
         return m.reply(
            `⚠️ Debes ingresar el enlace de un mensaje del canal y la reacción.\n\n` +
            `Ejemplo:\n${prefix + command} https://whatsapp.com/channel/0029Vb5Xr5VFHWpy8grwv52/113 Hola`
         );
      }

      const [link, ...reactionTextArray] = text.split(' ');
      const reactionText = reactionTextArray.join(' ');
      if (!reactionText) return m.reply('⚠️ ¡El texto para la reacción no puede estar vacío!');

      const charMap = {
         a: "🅐", b: "🅑", c: "🅒", d: "🅓", e: "🅔", f: "🅕", g: "🅖", h: "🅗", i: "🅘",
         j: "🅙", k: "🅚", l: "🅛", m: "🅜", n: "🅝", o: "🅞", p: "🅟", q: "🅠", r: "🅡",
         s: "🅢", t: "🅣", u: "🅤", v: "🅥", w: "🅦", x: "🅧", y: "🅨", z: "🅩",
         0: "⓿", 1: "➊", 2: "➋", 3: "➌", 4: "➍", 5: "➎", 6: "➏", 7: "➐", 8: "➑", 9: "➒"
      };

      const emojiReaction = reactionText
         .toLowerCase()
         .split("")
         .map((k) => (k === " " ? "―" : charMap[k] || k))
         .join("");

      const parts = link.split('/');
      const channelId = parts[4];
      const messageId = parts[5];

      try {
         const channelInfo = await conn.newsletterMetadata("invite", channelId);
         await conn.newsletterReactMessage(channelInfo.id, messageId, emojiReaction);
         m.reply(`✅ Reacción *${emojiReaction}* enviada al mensaje en el canal *${channelInfo.name}*.`);
      } catch (err) {
         return m.reply(
            `❌ No se pudo enviar la reacción.\n` +
            `Verifica que el enlace y el ID sean correctos.\n\nError: ${err.message}`
         );
      }
   },
   premium: false
};