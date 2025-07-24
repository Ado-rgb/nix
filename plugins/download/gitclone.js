const fetch = require('node-fetch');

exports.default = {
   names: ['Downloader'],
   tags: ['gitclone'],
   command: ['git', 'gitclone'],
   start: async (m, { conn, text, args, prefix, command }) => {
      if (!text) return m.reply(
`❌ Por favor ingresa el enlace del repositorio GitHub.\nEjemplo:\n${prefix + command} https://github.com/ruhend2001/maleficent`
      );

      const regexGit = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
      const link = text;

      if (!regexGit.test(link)) return m.reply('❌ Enlace inválido, verifica e intenta de nuevo.');

      let [, user, repo] = args[0].match(regexGit) || [];
      repo = repo.replace(/.git$/, '');

      const url = `https://api.github.com/repos/${user}/${repo}/zipball`;

      try {
         const res = await fetch(url, { method: 'HEAD' });
         const contentDisp = res.headers.get('content-disposition');
         const filename = contentDisp ? contentDisp.match(/attachment; filename=(.*)/)[1] : `${repo}.zip`;

         await conn.adReply(m.chat, `⏳ Por favor espera...\nEnviando repositorio ${user}/${repo}`, null, m);

         await conn.sendFile(m.chat, url, '', m, {
            document: true,
            fileName: filename,
            mimetype: 'application/zip'
         });
      } catch (error) {
         m.reply('❌ Error al obtener el repositorio. Verifica que el enlace sea correcto e intenta de nuevo.');
      }
   },
   limit: false,
   premium: false
};