import { Control } from './Control.js'
import { Player } from './Player.js'
import { Token } from './Token.js'

import LEVEL1 from '../levels/level1.js'
import WEAPONS from '../levels/weapons.js'

const PLAYER1 = {
    cooldown : 300,
    hitpoints : 100,
    image : './pics/SpaceShooterRedux/PNG/playerShip1_blue.png',
    name : 'Player1',
    speed : 600,
    weapon : WEAPONS.playerLaser
}

class Menudata {
    constructor(form) {
        const fData = new FormData(form)
        for (const pair of fData.entries()) {
            this[pair[0]] = pair[1]
        }
    }
}

class Gamekey extends EventTarget {
    constructor(code) {
        super()
        this.code = code
        this.down = false
        this.up = false
        super.addEventListener('down', () => {this.down = true; this.up = false})
        super.addEventListener('up', () => {this.down = false; this.up = true})
    }
}

class Game extends Control {
    constructor() {
        super(...arguments)
        this.clock = {
            curr : 0,
            last : 0,
            passed : 0
        }
        this.enemies = []
        this.keys = {}
        this.menus = {}
        this.timer = {
            curr : 0,
            diffDt : 0,
            delta : 1/60,
            last : 0,
            pause : false
        }
        this.players = []
        this.weapons = []

        window.addEventListener('resize', this.resize.bind(this))

        const forms = document.querySelectorAll('form')
        forms.forEach(form => {
            const menu = new Control(form)
            menu.addEventListener('submit', event => {
                event.preventDefault()
                if (event.target.action) {
                    const action = event.target.action.replace(location.origin + '/', '')
                    menu.dispatchEvent(new CustomEvent(action))
                }
            })
            this.menus[form.id] = menu
        })
        const startMenu = this.menus.startMenu
        startMenu.addEventListener('start', this.start.bind(this))
        startMenu.children.options.addEventListener('click', this.options.bind(this))
        this.menus.createPlayer.addEventListener('createPlayer', this.createPlayer.bind(this))
        this.menus.gameOver.addEventListener('restart', this.restart.bind(this))

        document.addEventListener('keydown', this.keydown.bind(this))
        document.addEventListener('keyup', this.keyup.bind(this))
        const keys = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space']
        keys.forEach(key => this.keys[key] = new Gamekey(key))
        
    }
    clamp(token) {
        const hitbox = this.hitbox
        var {x, y} = token
        x = (x <= token.width / 2) ? token.width / 2 : x
        x = (x >= hitbox.width - token.width / 2) ? hitbox.width - token.width / 2 : x
        y = (y <= token.height / 2) ? token.height / 2 : y
        y = (y >= hitbox.height - token.height / 2) ? hitbox.height - token.height / 2 : y
        return {x, y}
    }
    createPlayer(event) {
        const menu = this.menus.createPlayer
        if (menu.isVisible()) menu.hide()
        const data = new Menudata(event.target)
        const player = new Player(this.element, 0, 0, Object.assign(PLAYER1, {name : data.playerName}))
        player.hide()
        this.players.push(player)
        this.start(event)
    }
    init(level) {
        console.log(level)
        level.spawn(this, this.players)

        console.log(this)
        /* this.menus.gameOver.show() */
        this.resize()
    }
    keydown(event) {
        const key = this.keys[event.code]
        if (key) key.dispatchEvent(new CustomEvent('down'))
    }
    keyup(event) {
        const key = this.keys[event.code]
        if (key) key.dispatchEvent(new CustomEvent('up'))
    }
    options(event) {
        console.log('TODO : show options!', event)
    }
    resize() {
        this.height = window.innerHeight - 40
        this.width = 800
        this.setPosition(window.innerWidth / 2 - this.width / 2, 20)
        for (const key in this.menus) {
            const menu = this.menus[key]
            if (menu.isVisible()) {
                menu.setPosition(this.width / 2 - menu.width / 2, this.height / 2 - menu.height / 2)
            }
        }
        this.players.forEach(player => {
            if (player.y >= this.height) player.y = this.height - player.height - 10
            player.setPosition(player.x, player.y)
        })
    }
    restart(event) {
        const menu = this.menus.gameOver
        if (menu.isVisible()) menu.hide()
        this.menus.startMenu.show()
    }
    start(event) {
        const menu = this.menus.startMenu
        if (menu.isVisible()) menu.hide()
        if (!this.players.length) {
            this.menus.createPlayer.show()
            this.resize()
        }else{
            this.init(LEVEL1)
            this.update()
        }
    }
    update() {
        const clock = this.clock
        const timer = this.timer
        clock.curr = performance.now()
        clock.passed = (clock.curr - clock.last) / 1000
        timer.diffDt = clock.passed - timer.delta
        if (!timer.pause) {
            timer.curr += timer.delta + timer.diffDt
            timer.delta = timer.curr - timer.last
            this.updatePlayer(timer.delta)
            this.updateWeapons(timer.delta)
            this.updateEnemies(timer.delta)
            timer.last = timer.curr 
        }
        clock.last = performance.now()
        requestAnimationFrame(this.update.bind(this))
    }
    updateEnemies(delta) {
        const dx = Math.sin(this.timer.last) 
        const dy = Math.cos(this.timer.last)
        game.enemies.forEach(enemy => {
            enemy.setPosition(enemy.x + dx, enemy.y + dy)
            if (enemy.fireCooldown > 0) enemy.fireCooldown -= dt
        })
/*         var fire = false
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
        } */
    }
    updatePlayer(delta) {
        const player = this.players[0]
        if (this.keys.KeyS.down) {
            player.y += delta * player.speed
        }
        if (this.keys.KeyA.down) {
            player.x -= delta * player.speed
        }
        if (this.keys.KeyD.down) {
            player.x += delta * player.speed
        }
        if (this.keys.KeyW.down) {
            player.y -= delta * player.speed
        }
        if (this.keys.Space.down && player.fireCooldown <= 0) {
            const weapon = player.fire()
            this.weapons.push(weapon)
        }
        if (player.fireCooldown > 0) player.fireCooldown -= delta
        var {x ,y} = this.clamp(player)
        //var {x ,y} = player
        player.setPosition(x, y)
    }
    updateWeapons(delta) {
        this.weapons.forEach(weapon => {
            if (weapon.owner === 'player') {
                weapon.y -= delta * weapon.speed
                if (weapon.outOfBounds()) {
                    weapon.destroy()
                }else{
                    weapon.setPosition(weapon.x, weapon.y)
                }
            }
        })
        this.weapons = this.weapons.filter(weapon => !weapon.isDead)
    }
}

export { Game, Control, Player, PLAYER1, Token }