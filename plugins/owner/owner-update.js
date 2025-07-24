const { exec } = require('child_process');

exports.default = {
   names: ['Owner'],
   tags: ['update'],
   command: ['update', 'actualizar'],
   start: async (m) => {
      await m.reply('❇️ Actualizando bot desde el repositorio...');
      exec('git pull', (error, stdout, stderr) => {
         if (error) {
            return m.reply(`❌ Error al actualizar:\n${error.message}`);
         }
         if (stderr) {
            return m.reply(`⚠ Advertencia:\n${stderr}`);
         }
         if (stdout.includes('Already up to date')) {
            m.reply('✅ El bot ya está en la última versión.');
         } else {
            m.reply(`✨ Archivos actualizados:\n${stdout}`);
            // Si quieres reiniciar el bot al actualizar descomenta:
            // process.exit(0);
         }
      });
   },
   owner: true
};