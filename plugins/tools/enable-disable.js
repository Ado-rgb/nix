const { restoreMongo } = require('../../lib/src/cloud/mongo-db.js');
const { restoreGithub } = require('../../lib/src/cloud/github-db.js');

exports.default = {
   names: ['Tools'],
   tags: ['on', 'off'],
   command: ['on', 'off', 'enable', 'disable'],
   start: async (m, { conn, text, prefix, command, Format, isOwner, isAdmins, isPremium, groupName }) => {
      const cmd_on = ['on', 'enable'];
      const cmd_off = ['off', 'disable'];
      const owner_admin = isOwner || isAdmins;

      let caption = `*Opciones disponibles para ${command}*\n\n`;
      caption += `• ${prefix + command} welcome\n`;
      caption += `• ${prefix + command} antilink\n`;
      caption += `• ${prefix + command} viewonce / once\n`;
      caption += `• ${prefix + command} autodl / autodown\n`;
      caption += `• ${prefix + command} autobackup\n`;
      caption += `• ${prefix + command} antitoxic / toxic\n`;
      caption += `• ${prefix + command} antiphoto\n`;
      caption += `• ${prefix + command} antibot\n`;
      caption += `• ${prefix + command} anticall\n`;
      caption += `• ${prefix + command} autoreadsw / readsw\n`;
      caption += `• ${prefix + command} autobio / bio\n`;
      caption += `• ${prefix + command} autosticker / sticker\n`;
      caption += `• ${prefix + command} antispam / spam\n`;
      caption += `• ${prefix + command} antitagsw\n`;
      caption += `• ${prefix + command} chat_ai / ai\n`;
      caption += `• ${prefix + command} hd / remini\n`;
      caption += `• ${prefix + command} sholat / autosholat\n`;
      caption += `• ${prefix + command} blockpc / autoblockpc`;

      if (!text) return m.reply(caption);

      const on = cmd_on.includes(command);
      const off = cmd_off.includes(command);

      switch (text.toLowerCase()) {
         case 'welcome':
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!owner_admin) return m.reply(mess.GrupAdmin);
            db.chats[m.chat].welcome = on;
            m.reply(`✔ Bienvenida ${on ? 'activada' : 'desactivada'} en el grupo ${groupName}`);
            break;

         case 'antilink':
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!owner_admin) return m.reply(mess.GrupAdmin);
            db.chats[m.chat].antilink = on;
            m.reply(`✔ Antilink ${on ? 'activado' : 'desactivado'} en el grupo ${groupName}`);
            break;

         case 'viewonce':
         case 'once':
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!owner_admin) return m.reply(mess.GrupAdmin);
            db.chats[m.chat].viewOnce = on;
            m.reply(`✔ Mensajes de una sola vista ${on ? 'activados' : 'desactivados'} en el grupo ${groupName}`);
            break;

         case 'anticall':
            if (!isOwner) return m.reply(mess.OnlyOwner);
            save.global(`global.anticall = ${!on}`, `global.anticall = ${on}`);
            m.reply(`✔ Anti-llamadas ${on ? 'activado' : 'desactivado'}`);
            break;

         case 'blockpc':
         case 'autoblockpc':
            if (!isOwner) return m.reply(mess.OnlyOwner);
            if (on && global.group_mode) return m.reply('❌ El modo grupo está activo. Desactívalo con .setgcmode off');
            db.settings.block_pc = on;
            m.reply(`✔ Bloqueo de chats privados ${on ? 'activado' : 'desactivado'}`);
            break;

         case 'sholat':
         case 'autosholat':
            if (!isOwner) return m.reply(mess.OnlyOwner);
            save.global(`global.auto_sholat = ${!on}`, `global.auto_sholat = ${on}`);
            m.reply(`✔ Auto Sholat ${on ? 'activado' : 'desactivado'}`);
            break;

         case 'autodl':
         case 'autodown':
            if (!isOwner) return m.reply(mess.OnlyOwner);
            db.settings.auto_down = on;
            m.reply(`✔ Auto descarga ${on ? 'activada' : 'desactivada'}`);
            break;

         case 'autosticker':
         case 'sticker':
         case 'stiker':
            if (!isOwner) return m.reply(mess.OnlyOwner);
            db.settings.auto_sticker = on;
            m.reply(`✔ Auto sticker ${on ? 'activado' : 'desactivado'}`);
            break;

         case 'antitoxic':
         case 'toxic':
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!owner_admin) return m.reply(mess.GrupAdmin);
            db.chats[m.chat].antiToxic = on;
            m.reply(`✔ Anti-Toxic ${on ? 'activado' : 'desactivado'} en el grupo ${groupName}`);
            break;

         case 'antiphoto':
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!owner_admin) return m.reply(mess.GrupAdmin);
            db.chats[m.chat].antiPhoto = on;
            m.reply(`✔ Anti-fotos ${on ? 'activado' : 'desactivado'} en el grupo ${groupName}`);
            break;

         case 'antibot':
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!owner_admin) return m.reply(mess.GrupAdmin);
            db.chats[m.chat].antiBot = on;
            m.reply(`✔ Anti-bots ${on ? 'activados' : 'desactivados'} en el grupo ${groupName}`);
            break;

         case 'antitagsw':
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!owner_admin) return m.reply(mess.GrupAdmin);
            db.chats[m.chat].tagsw = on;
            m.reply(`✔ Anti-tags SW ${on ? 'activado' : 'desactivado'} en el grupo ${groupName}`);
            break;

         case 'hd':
         case 'remini':
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!isOwner) return m.reply(mess.OnlyOwner);
            db.chats[m.chat].hd = on;
            m.reply(`✔ HD/Remini ${on ? 'activado' : 'desactivado'} en el grupo ${groupName}`);
            break;

         case 'autoreadsw':
         case 'readsw':
            if (!isOwner) return m.reply(mess.OnlyOwner);
            db.settings.readsw = on;
            m.reply(`✔ Auto lectura de estados ${on ? 'activada' : 'desactivada'}`);
            break;

         case 'autobio':
         case 'bio':
            if (!isOwner) return m.reply(mess.OnlyOwner);
            db.settings.autobio = on;
            if (off) {
               await Format.sleep(3000);
               await conn.updateProfileStatus(' ‎');
            }
            m.reply(`✔ Auto bio ${on ? 'activado' : 'desactivado'}`);
            break;

         case 'antispam':
         case 'spam':
            if (!isOwner) return m.reply(mess.OnlyOwner);
            db.settings.antispam = on;
            m.reply(`✔ Anti-spam ${on ? 'activado' : 'desactivado'}`);
            break;

         case 'chat_ai':
         case 'ai':
            if (!m.isGroup && !isPremium) return m.reply(mess.premium);
            if (m.isGroup && !owner_admin) return m.reply(mess.GrupAdmin);

            if (!m.isGroup) {
               db.users[m.sender].chat_ai = on;
               m.reply(`✔ Chat AI ${on ? 'activado' : 'desactivado'} para ti`);
            } else {
               db.chats[m.chat].chat_ai = on;
               m.reply(`✔ Chat AI ${on ? 'activado' : 'desactivado'} en el grupo ${groupName}`);
            }
            break;
      }

      if (['autobackup', 'backup'].includes(text.split(" ")[0]) || text.split(" ")[1]) {
         if (!isOwner) return m.reply(mess.OnlyOwner);
         const pick = text.split(" ")[1];
         if (!pick) return m.reply(`Debes indicar el servicio. Ejemplo:\n${prefix + command} mongo\nServicios disponibles: mongo, github`);

         if (!['mongo', 'github'].includes(pick)) return m.reply('❌ Solo están disponibles mongo y github');

         if (on && pick === 'mongo') {
            if (backup_mongo) return m.reply('⚠ Auto-backup MongoDB ya está activado');
            m.reply('Activando auto-backup a MongoDB...');
            const response = await restoreMongo();
            if (!response) return response;
            await save.global('global.backup_mongo = false', 'global.backup_mongo = true');
            m.reply('✔ Auto-backup MongoDB activado. Reiniciando...');
            reset();
         } else if (off && pick === 'mongo') {
            if (!backup_mongo) return m.reply('⚠ Auto-backup MongoDB ya está desactivado');
            m.reply('Desactivando auto-backup a MongoDB...');
            await save.global('global.backup_mongo = true', 'global.backup_mongo = false');
            m.reply('✔ Auto-backup MongoDB desactivado. Reiniciando...');
            reset();
         } else if (on && pick === 'github') {
            if (backup_github) return m.reply('⚠ Auto-backup GitHub ya está activado');
            m.reply('Activando auto-backup a GitHub...');
            const data = await restoreGithub();
            if (!data.status) {
               m.reply('❌ Error al activar auto-backup GitHub');
               throw data;
            }
            await save.global('global.backup_github = false', 'global.backup_github = true');
            m.reply('✔ Auto-backup GitHub activado. Reiniciando...');
            reset();
         } else if (off && pick === 'github') {
            if (!backup_github) return m.reply('⚠ Auto-backup GitHub ya está desactivado');
            m.reply('Desactivando auto-backup a GitHub...');
            save.global('global.backup_github = true', 'global.backup_github = false');
            m.reply('✔ Auto-backup GitHub desactivado');
         }
      }
   }
};