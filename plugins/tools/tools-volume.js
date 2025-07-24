exports.default = {
   names: ['Tools'],
   tags: ['volume'],
   command: ['volume', 'vol'],
   start: async (m, { conn, text, prefix, command, mime, quoted, Format }) => {
      if (/audio|video|document/.test(mime)) {
         m.reply('⏳ Ajustando volumen...');
         const buffer = await quoted.download();
         const media = await Format.volume(buffer, text);
         conn.sendFile(m.chat, media, '', m);
      } else {
         return m.reply(
            `⚠️ Responde a un audio o envía uno para ajustar su volumen.\n\n` +
            `• Usa valores como: \`1.2\`, \`1.5\`, \`2.0\` para subir volumen.\n` +
            `• Usa valores como: \`0.9\`, \`0.8\`, \`0.5\` para bajarlo.\n\n` +
            `Ejemplo para subir volumen: *${prefix + command} 1.4*\n` +
            `Se recomienda trabajar siempre con el archivo original para mejor calidad.`
         );
      }
   },
   limit: false
};