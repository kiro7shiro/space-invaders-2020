import { Entity } from './Entity.js'

class Gamemenu extends Entity {
    constructor (element) {
        super()
        this.container = element.parentElement
        this.element = element
        this.element.id = 'menu'
        this.element.addEventListener('click', this.click.bind(this))

        this.createPlayerMenu = new Entity()
        this.createPlayerMenu.container = this.element
        this.createPlayerMenu.element = document.getElementById('create-player')
        this.createPlayerMenu.element.id = 'create-player'
        this.createPlayerMenu.keyDown = function(e) {
            if (e.code === 'Enter') {
                this.createPlayerMenu.hide()
            }
            if (e.code === 'Escape') {
                this.createPlayerMenu.hide()
                this.welcomeMenu.show()
            }
            console.log(e.code)
        }
        this.createPlayerMenu.element.addEventListener(
            'keydown',
            this.createPlayerMenu.keyDown.bind(this)
        )

        this.welcomeMenu = new Entity()
        this.welcomeMenu.container = this.element
        this.welcomeMenu.element = document.getElementById('welcome')
        this.welcomeMenu.element.id = 'welcome'

    }
    click(event) {
        const action = event.target.dataset.action
        if (this[action]) this[action]()
    }
    start() {
        const game = this.container
        this.welcomeMenu.hide()
        if (!game.player) {
            // create new players here!
            this.createPlayerMenu.show()

        }else{
            game.timer.pause = false
        }
        
    }
}

export { Gamemenu }