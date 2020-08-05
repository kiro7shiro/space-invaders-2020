import { Entity } from './Entity.js'
import { Weapon } from './Weapon.js'
import WEAPONS from './levels/weapons.js'

const PLAYER1 = {
    cooldown : 0,
    hitpoints : 100,
    image : './pics/SpaceShooterRedux/PNG/playerShip1_blue.png',
    speed : 600,
    weapon : WEAPONS.playerLaser
}

class Player extends Entity {
    constructor(container, x, y, {cooldown, hitpoints, image, speed, weapon} = {}) {
        super(container, 'img', x, y)
        this.element.src = image
        this.element.id = 'player'

        this.cooldown = cooldown
        this.damage = {
            hitpoints,
            element : document.createElement('div')
        }
        this.damage.element.id = 'damage'
        this.damage.element.innerText = this.damage.hitpoints
        this.score = {
            points : 0,
            element : document.createElement('div')
        }
        this.score.element.id = 'score'
        this.score.element.innerText = 'Player : ' + this.score.points
        this.speed = speed
        this.weapon = weapon

        container.appendChild(this.score.element)
        container.appendChild(this.damage.element)

    }
    fire() {
        const weapon = new Weapon(
            this.container,
            this.x + this.offsetX, this.y + this.offsetY,
            'player',
            this.weapon
        )
        weapon.sound.play()
        this.cooldown = weapon.cooldown
        return weapon
    }
}

export { Player, PLAYER1 }