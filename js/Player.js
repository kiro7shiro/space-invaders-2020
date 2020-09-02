import { Token } from "./Token.js"
import { Weapon } from "./Weapon.js"

class Player extends Token {
    constructor(container, x, y, {damage, hitpoints, image, name, speed, transforms, owner, weapon} = {}) {
        super(container, 'img', x, y, {damage, hitpoints, image, name, speed, transforms, owner})
        this.element.src = image
        this.element.id = name
        this.classList.add('player')
        this.fireCooldown = 0
        this.weapon = weapon
        this.weapon.owner = 'player'

        const board = document.getElementById('board')
        const score = document.createElement('div')
        score.id = this.name + 'Score'
        score.classList.add('w3-label', 'w3-padding')
        score.innerHTML = `<h1>${this.name} : 0</h1>`
        board.appendChild(score)
        this._score = score

    }
    get score() {
        return Number(this._score.textContent.split(':')[1].trim())
    }
    set score(val) {
        this._score.innerHTML = `<h1>${this.name} : ${val}</h1>`
    }
    defend(token){}
    fire() {
        const weapon = new Weapon(this.container, this.x, this.y, this.weapon)
        weapon.setPosition(this.x, this.y - weapon.height / 2)
        this.fireCooldown = weapon.cooldown
        return weapon
    }
}

export { Player }