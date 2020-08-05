import { Player, PLAYER1 } from './Player.js'
import { Enemy } from './Enemy.js'
import { getRandomNumber } from './Random.js'
import { Entity } from './Entity.js'
import level1 from './levels/level1.js'
// setup
const game = document.getElementById('game')
game.height = window.innerHeight 
game.width = 800
game.keyPressed = {
    down : false,
    left : false,
    right : false,
    space : false,
    up : false
}
game.timer = {
    curr : Date.now(),
    delta : 0,
    last : Date.now()
}
game.weapons = []
game.enemies = []

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
    switch (e.code) {
        case 'ArrowDown':
            game.keyPressed.down = true
            break
        case 'Space':
            game.keyPressed.space = true
            break
        case 'ArrowLeft':
            game.keyPressed.left = true
            break
        case 'ArrowRight':
            game.keyPressed.right = true
            break
        case 'ArrowUp':
            game.keyPressed.up = true
            break
    }
}

function keyUp(e) {
    switch (e.code) {
        case 'ArrowDown':
            game.keyPressed.down = false
            break
        case 'Space':
            game.keyPressed.space = false
            break
        case 'ArrowLeft':
            game.keyPressed.left = false
            break
        case 'ArrowRight':
            game.keyPressed.right = false
            break
        case 'ArrowUp':
            game.keyPressed.up = false
            break
    }
}

function resize() {
    game.height = window.innerHeight - 50
    game.width = 800
    game.style.left = (window.innerWidth / 2 - game.width / 2) + 'px'
    game.style.height = game.height + 'px'
    game.style.width = game.width + 'px'
    player.setPosition(player.x, game.height - 50)
}

function update() {
    var timer = game.timer
    timer.curr = Date.now()
    timer.delta = (timer.curr - timer.last) / 1000.0
    updatePlayer(timer.delta)
    updateWeapons(timer.delta)
    updateEnemies(timer.delta)
    timer.last = timer.curr
    requestAnimationFrame(update)
}

function updatePlayer(dt) {
    if (game.keyPressed.down)   {
        player.y += dt * player.speed
    }
    if (game.keyPressed.left) {
        player.x -= dt * player.speed
    }
    if (game.keyPressed.right) {
        player.x += dt * player.speed
    }
    if (game.keyPressed.up) {
        player.y -= dt * player.speed
    }
    if (game.keyPressed.space && player.cooldown <= 0) {
        game.weapons.push(player.fire())
    }
    if (player.cooldown > 0) player.cooldown -= dt

    const hitDt = Date.now() - player.lastHit
    player.wasHit(hitDt)

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
                    weapon.destroy()
                    enemy.destroy()
                }
            })
        }
        if (weapon.owner === 'enemy') {
            weapon.y += dt * weapon.speed
            if (weapon.hit(player)){
                weapon.destroy()
                player.lastHit = Date.now()
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
    const dx = Math.sin(game.timer.last / 1000.0) * 50
    const dy = Math.cos(game.timer.last / 1000.0) * 10
    game.enemies.forEach(enemy => {
        enemy.offset(dx, dy)
        if (enemy.cooldown > 0) enemy.cooldown -= dt
    })
    var fire = false
    var fIdx = getRandomNumber(0, game.enemies.length - 1, 0)
    var firing = game.enemies[fIdx]
    if (firing.cooldown <= 0) {
        var ray = new Entity(game, 'div', firing.x + dx, firing.y + dy)
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

window.addEventListener('resize', resize)
window.addEventListener('keydown', keyDown)
window.addEventListener('keyup', keyUp)
resize()
init()
requestAnimationFrame(update)