import * as App from './js/space-invaders-2020.js'

const game = new App.Game('game')
game.menus.startMenu.show()
game.resize()

window.game = game
console.log(game)