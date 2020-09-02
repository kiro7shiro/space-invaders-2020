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
        this.menus.gameOver.show()
        this.resize()
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
    options(event) {
        console.log('TODO : show options!', event)
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
        }
    }
}

export { Game, Control, Player, PLAYER1, Token }