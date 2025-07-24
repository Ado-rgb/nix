exports.default = {
   names: ['Main Menu'],
   tags: ['menu'],
   command: ['menu', 'help', 'allmenu', 'command', 'm', 'all', 'meni'],
   start: async (m, { conn, text, prefix, command, Format }) => {
      const garis = '' 
      const side = '' 
      const top = '' 
      const bot = '' 
      const { Upload, Download } = await Format.statistic();
      const title = `${setting.botName}\n${setting.footer}`;
      const music = setting.music;
      const lolim = logo_limit || 'Ⓛ';
      const loprem = logo_premium || 'Ⓟ';
      const select = 'SELECT HERE';
      const header_sub = `LISTA DE MENÚ`;
      const header = `┌────`;
      const middle = `│`;
      const pointer = `🎋`;
      const bottom = `└──────────⭓\n`;
      const left = `『`;
      const right = `』`;
      const bigHeader = false;
      const type = db.settings.menu_type;
      const top_1 = { left, right, bigHeader, text, header_sub, select, type, command };
      const sosmed = setting.sosmed.toLowerCase().replace('https://', '');
      const audio = () => conn.sendFile(m.chat, setting.music, '', m, { ptt: true });

      let info = `${top}${garis}${side} 🔰 *Menú Principal ${setting.botName}* 🔰\n${side} ❇️ Bot de WhatsApp confiable\n${side} 🔥 By ${setting.footer}\n${side}${garis}\n`;
      info += `${side} 👋 ¡Hola ${waktu.suasana.charAt(0).toUpperCase() + waktu.suasana.slice(1)}!\n${side} Usuario: @${m.sender.split('@')[0]} 📗\n`;
      info += `${side} 📊 Total de comandos usados:\n${side} Tú: ${db.users[m.sender].hitCmd} veces\n${side}${garis}\n`;
      info += `${side} 👤 Propietario: +${setting.contact}\n`;
      info += `${side}\n${side}${garis}\n`;
      info += `${side} 📡 Estadísticas de red:\n${side} 📥 Descargas: ${Download}\n${side} 📤 Subidas: ${Upload}\n${side}${garis}\n`;
      info += `${side} ${lolim} = Límite\n${side} ${loprem} = Premium\n${bot}${garis}`;

      if (type === 1) {
         m.react('📗');
         const all_menu = await Format.Menu(header, middle, pointer, bottom, prefix, top_1);
         conn.adReply(m.chat, `${info}\n${all_menu}`, cover, m);
         audio();
      } else if (type === 2) {
         m.react('❇️');
         const sub_menu = await Format.Menu(header, middle, pointer, bottom, prefix, top_1);
         conn.adReply(m.chat, `${info}\n${sub_menu}`, cover, m);
         audio();
      } else if (type === 3) {
         m.react('🔰');
         const opts = [
            { title: 'Owner', id: '.owner' },
            { title: 'Sewa', id: '.sewa' },
            { title: 'Source Code', id: '.sc' }
         ];
         const { menu, message } = await Format.Menu(header, middle, pointer, bottom, prefix, top_1, opts);
         if (!text) {
            conn.sendList(m.chat, info, message, m, {
               isMedia: true,
               media: { image: { url: cover } }
            });
         } else if (text || text.toLowerCase() === 'all') {
            conn.sendList(m.chat, `${info}\n${menu}`, message, m, {
               isMedia: true,
               media: { image: { url: cover } }
            });
         }
      }
   }
}