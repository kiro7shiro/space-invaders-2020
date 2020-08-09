import { Player, PLAYER1 } from './Player.js'
import { Enemy } from './Enemy.js'
import { getRandomNumber } from './Random.js'
import level1 from './levels/level1.js'
import { Gametoken } from './Gametoken.js'
import { Gamemenu } from './Gamemenu.js'
import { Gamekey } from './Gamekey.js'
// setup
const game = document.getElementById('game')
game.height = window.innerHeight 
game.width = 800
game.timer = {
    curr : 0,
    delta : 1/60,
    last : 0,
    pause : true
}
game.enemies = []
game.weapons = []
game.player = undefined

const menu = new Gamemenu(document.getElementById('menu'))
menu.height = 200
menu.width = 250
menu.setPosition(game.width / 2 - menu.width / 2, game.height / 4)

game.keys = {}
game.keys.Escape = new Gamekey('Escape')
game.keys.Escape.on('up', function() {
    if (menu.welcomeMenu.isVisible()) {
        game.timer.pause = false
        menu.welcomeMenu.hide()
    }else{
        game.timer.pause = true
        menu.welcomeMenu.show()
    }
})
game.keys.ArrowDown = new Gamekey('ArrowDown')
game.keys.ArrowLeft = new Gamekey('ArrowLeft')
game.keys.ArrowRight = new Gamekey('ArrowRight')
game.keys.ArrowUp = new Gamekey('ArrowUp')
game.keys.Space = new Gamekey('Space')


function clamp(v, min, max) {
    if (v <= min) {
      return min
    } else if (v >= max) {
      return max
    } else {
      return v
    }
}

function init() {
    const enemySpacing = (game.width - 160) / 9
    for (let row = 0; row < 3; row++) {
        const y = 70 + row * 80
        for (let col = 0; col < 10;col++) {
            const x = col * enemySpacing + 80
            game.enemies.push(new Enemy(
                game,
                x, y,
                level1.enemies[0]
            ))
        }
    }
}

function keyDown(e) {
    if (!game.keys[e.code]) game.keys[e.code] = new Gamekey(e.code)
    game.keys[e.code].emit('down')
}

function keyUp(e) {
    if (!game.keys[e.code]) game.keys[e.code] = new Gamekey(e.code)
    game.keys[e.code].emit('up')
}

function resize() {
    game.height = window.innerHeight - 50
    game.width = 800
    game.style.left = (window.innerWidth / 2 - game.width / 2) + 'px'
    game.style.height = game.height + 'px'
    game.style.width = game.width + 'px'
    if (menu.isVisible()) {
        menu.setPosition(game.width / 2 - menu.width / 2, game.height / 4)
    }
    player.setPosition(player.x, game.height - 50)
}

function update() {
    // update levels here
    var timer = game.timer
    if (!timer.pause) {
        timer.curr += timer.delta
        timer.delta = (timer.curr - timer.last)
        updatePlayer(timer.delta)
        updateWeapons(timer.delta)
        updateEnemies(timer.delta)
        timer.last = timer.curr 
    }
    requestAnimationFrame(update)
}

setInterval(() => console.log(game.timer), 1000)

function updatePlayer(dt) {
    if (game.keys.ArrowDown.down) {
        player.y += dt * player.speed
    }
    if (game.keys.ArrowLeft.down) {
        player.x -= dt * player.speed
    }
    if (game.keys.ArrowRight.down) {
        player.x += dt * player.speed
    }
    if (game.keys.ArrowUp.down) {
        player.y -= dt * player.speed
    }
    if (game.keys.Space.down && player.fireCooldown <= 0) {
        const weapon = player.fire()
        game.weapons.push(weapon)
        console.log(weapon)
    }
    if (player.fireCooldown > 0) player.fireCooldown -= dt
    player.x = clamp(player.x, player.width, game.width - player.width)
    player.y = clamp(player.y, player.height, game.height - player.height - 20)
    player.setPosition(player.x, player.y)
}

function updateWeapons(dt) {
    game.weapons.forEach(weapon => {
        if (weapon.isDead) return
        if (weapon.owner === 'player') {
            weapon.y -= dt * weapon.speed
            game.enemies.forEach(enemy => {
                if (enemy.isDead) return
                if (weapon.hit(enemy)) {
                    enemy.defend(weapon)
                    weapon.destroy()
                }
            })
        }
        if (weapon.owner === 'enemy') {
            weapon.y += dt * weapon.speed
            if (weapon.hit(player)) {
                player.defend(weapon)
                weapon.destroy()
            }
        }
        if (weapon.y < 0 || weapon.y > game.height) {
            weapon.destroy()
        }else{
            weapon.setPosition(weapon.x, weapon.y)
        }
    })
    game.weapons = game.weapons.filter(weapon => !weapon.isDead)
    game.enemies = game.enemies.filter(enemy => !enemy.isDead)
}

function updateEnemies(dt) {
    const dx = Math.sin(game.timer.last) * 50
    const dy = Math.cos(game.timer.last) * 10
    game.enemies.forEach(enemy => {
        enemy.offset(dx, dy)
        if (enemy.fireCooldown > 0) enemy.fireCooldown -= dt
    })
    var fire = false
    var fIdx = getRandomNumber(0, game.enemies.length - 1, 0)
    var firing = game.enemies[fIdx]
    if (firing.fireCooldown <= 0) {
        var ray = new Gametoken(game, 'div', firing.x + dx, firing.y + dy)
        ray.element.id = 'ray'
        fire = true
        for (let eCnt = fIdx + 1; eCnt < game.enemies.length; eCnt++) {
            const enemy = game.enemies[eCnt]
            if (ray.hit(enemy)) {
                fire = false
                break
            }
        }
        ray.destroy()
        if (fire) game.weapons.push(firing.fire())
    }
}

const player = new Player(
    game,
    game.width / 2,
    game.height - 100,
    PLAYER1
)
game.player = player

// start up
window.addEventListener('resize', resize)
window.addEventListener('keydown', keyDown)
window.addEventListener('keyup', keyUp)
resize()
init()
requestAnimationFrame(update)