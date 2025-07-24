exports.default = {
   names: ['Tools'],
   tags: ['circle', 'bulat'],
   command: ['circle', 'bulat'],
   start: async (m, { conn, text, prefix, command, mime, quoted, Format }) => {
      if (/image/.test(mime) || m.mtype === 'imageMessage') {
         try {
            m.react('🕒');
            m.reply('⏳ Convirtiendo tu imagen a círculo...');
            const content = await quoted.download();
            const image = text
               ? await Format.circle_photo(content, parseInt(text))
               : await Format.circle_photo(content);
            conn.sendFile(m.chat, image, '', m);
         } catch {
            throw '❌ ¡Ocurrió un error al convertir la imagen!';
         }
      } else {
         return m.reply(
            `⚠️ Responde o envía una imagen con el comando ${prefix + command} para convertirla en círculo.\n\n` +
            `*Opcional:* puedes ajustar el tamaño especificando un valor.\n` +
            `Ejemplo: ${prefix + command} 300`
         );
      }
   },
   limit: false
};