import { Weapon } from './Weapon.js'
import { Gametoken } from './Gametoken.js'
import WEAPONS from './levels/weapons.js'

const PLAYER1 = {
    cooldown : 300,
    hitpoints : 100,
    image : './pics/SpaceShooterRedux/PNG/playerShip1_blue.png',
    name : 'Player1',
    speed : 600,
    weapon : WEAPONS.playerLaser
}

class Player extends Gametoken {
    constructor(container, x, y, {cooldown, hitpoints, image, name, speed, transforms, weapon} = {}) {
        super(container, 'img', x, y, {cooldown, hitpoints, speed, transforms, weapon})
        this.element.src = image
        this.element.id = 'player'
        this.fireCooldown = 0
        this.name = name

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
        this.score.element.innerText = this.name + ' : ' + this.score.points
        
        container.appendChild(this.score.element)
        container.appendChild(this.damage.element)

    }
    defend(weapon) {
        // calc damage
        // show hit animation
        const classList = this.element.classList
        if (!classList.contains('player-hit')) {
            classList.add('player-hit')
            setTimeout(function() {
                classList.remove('player-hit')
            }, this.cooldown)
        }
    }
    fire() {
        const weapon = new Weapon(
            this.container,
            this.x + this.offsetX, this.y + this.offsetY,
            'player',
            this.weapon
        )
        weapon.sound.play()
        this.fireCooldown = weapon.cooldown
        return weapon
    }
}

export { Player, PLAYER1 }