exports.default = {
   names: ['Downloader'],
   tags: ['spotify'],
   command: ['spotify'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`Ejemplo : ${prefix+command} https://open.spotify.com/track/0X9hepyA3YD1qW2zZbet6V?si=iBA644naR3aKiJ2xSZt2Cw`);      
      const { metadata, download } = await Format.Scraper.spotify(text);
      const { album, album_artist, album_name, artist, cover_url, name } = metadata;
      const { file_url } = download;
      let caption = `*Spotify* \n`
      caption += `Album: ${album}\n`
      caption += `Album Artis: ${album_artist}\n`
      caption += `Album Name: ${album_name}\n`
      caption += `Artis: ${artist}\n`
      caption += `Username: ${name}\n\n`
      caption += `Enviando...`
      conn.adReply(m.chat, caption, cover_url, m);   
      conn.sendFile(m.chat, file_url, '', m, {
         document: true,
         fileName: `${album_name} • ${album_artist}~Spotify_Ruhend-MD.mp3`,
         mimetype: 'audio/mpeg'
      })  
   },
   limit: 2
};