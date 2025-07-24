exports.default = {
   names: ['Owner'],
   tags: ['addlimit'],
   command: ['addlimit', 'añadirlímite'],
   start: async (m, {
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(
`⚠️ *Uso del comando:*
Ingresa o etiqueta el número y el límite que deseas agregar.

Ejemplos:
> ${prefix + command} número límite
> ${prefix + command} 521xxxxxxxxxx 25
> ${prefix + command} @usuario 25`
      );

      const parts = text.split(" "), limit = parts.pop(), number = parts.join(" "); 
      if (!limit || isNaN(limit)) return m.reply(
`⚠️ *Error:* El límite debe ser un número válido.

Ejemplos:
> ${prefix + command} número límite
> ${prefix + command} 521xxxxxxxxxx 25
> ${prefix + command} @usuario 25`
      );

      const Number = number.replace(/[@+\s-]/g, '');
      const num = `${Number}@s.whatsapp.net`;

      if (!db.users[num]) return m.reply(`❌ Usuario con número *${num}* no encontrado en la base de datos. Asegúrate de que esté registrado.`);

      db.users[num].limit += parseInt(limit);
      m.reply(`✅ Se añadieron *${limit}* límites a *${num.split('@')[0]}* 🎉`);
   },
   owner: true
};