var menubar = require('menubar')

var mb = menubar({
  dir: './dist',
  icon: './dist/IconTemplate.png',
  width: 500,
  height: 400,
  alwaysOnTop: true
})

mb.on('ready', () => {
  console.log('app is ready')
})
