const { readFileSync, writeFileSync } = require('fs')

require('NeteaseCloudMusicApi').playlist_detail({ id: 2622807221, s: 0 }).then(value => {
  if (value.status !== 200) throw new Error('Not 200!')
  let tracks = ''
  value.body.playlist.tracks.forEach(it => {
    tracks += `<div>
      <a href="https://music.163.com/#/song?id=${it.id}" target="_blank"><img src="${it.al.picUrl}?param=250y250" alt="${it.name}"></a>
      <a href="https://music.163.com/#/song?id=${it.id}" target="_blank"><h4>${it.name}</h4></a>
      <h5>${it.ar.filter(ar => ar.id !== 51483319).map(ar => `<a href="https://music.163.com/#/artist?id=${ar.id}" target="_blank">${ar.name}</a>`).join(' & ')}</h5>
    </div>`
  })
  const first = value.body.playlist.tracks[0]
  writeFileSync('index.html', readFileSync('index.template.html', 'utf-8')
    .replace('%%year%%', new Date().getFullYear())
    .replace('%%tracks%%', tracks)
    .replace('%%background%%', first.al.picUrl)
    .replace('%%latest%%', `
      <a href="https://music.163.com/#/song?id=${first.id}" target="_blank"><img src="${first.al.picUrl}?param=350y350" alt="${first.name}"></a>
      <a href="https://music.163.com/#/song?id=${first.id}" target="_blank"><h4>${first.name}</h4></a>
      <h5>${first.ar.filter(ar => ar.id !== 51483319).map(ar => `<a href="https://music.163.com/#/artist?id=${ar.id}" target="_blank">${ar.name}</a>`).join(' & ')}</h5>
      <div class="icons">
        <span>收听新单曲:</span>
        <a class="iconfont icon-netease-cloud-music-line" href="https://music.163.com/#/song?id=${first.id}" target="_blank"></a>
        <a class="iconfont icon-soundcloud" href="https://soundcloud.com/soaringrecords" target="_blank"></a>
      </div>`
    ))
}, error => {
  console.error(error)
  process.exit(-1)
})
