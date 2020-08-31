import { Control } from './Control.js'
import { Player } from './Player.js'
import { Token } from './Token.js'
import WEAPONS from '../levels/weapons.js'

const PLAYER1 = {
    cooldown : 300,
    hitpoints : 100,
    image : './pics/SpaceShooterRedux/PNG/playerShip1_blue.png',
    name : 'Player1',
    speed : 600,
    weapon : WEAPONS.playerLaser
}

class Game extends Control {
    constructor() {
        super(...arguments)
        this.enemies = []
        this.menus = {}
        this.timer = {
            curr : 0,
            clock : {
                curr : 0,
                last : 0,
                passed : 0
            },
            delta : 1/60,
            diffDt : 0,
            last : 0,
            pause : true
        }
        this.players = []
        this.weapons = []

        window.addEventListener('resize', this.resize.bind(this))

        var menus = document.querySelectorAll('.menu')
        menus.forEach(menu => {
            this.menus[menu.id] = new Control(menu)
            menu.addEventListener('click', this.click.bind(this))
            menu.addEventListener('keydown', this.click.bind(this))
        })

    }
    click(event) {
        const action = event.target.dataset.action
        if (this[action]) this[action]()
        console.log(action)
    }
    resize() {
        this.height = window.innerHeight 
        this.width = 800
        this.setPosition(window.innerWidth / 2 - this.width / 2, 0)
        for (const key in this.menus) {
            const menu = this.menus[key]
            if (menu.isVisible()) {
                menu.setPosition(this.width / 2 - menu.width / 2, this.height / 2 - menu.height / 2)
            }
        }
        this.players.forEach(player => {
            player.setPosition(player.x, player.y)
        })
    }
    start() {
        if (this.menus.startMenu.isVisible()) this.menus.startMenu.hide()
        if (!this.players.length) {
            this.menus.createPlayer.show()
            this.resize()
        }
    }
}

export { Game, Control, Player, PLAYER1, Token }