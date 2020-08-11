import { Weapon } from './Weapon.js'
import { Gametoken } from './Gametoken.js'

class Enemy extends Gametoken {
    constructor(container, x, y, {cooldown, hitpoints, image, speed, transforms, weapon} = {}) {
        super(container, 'img', x, y, {cooldown, hitpoints, speed, transforms, weapon})
        this.element.src = image
        this.element.id = 'enemy'
        this.fireCooldown = 0
    }
    defend(weapon) {
        // calc damage
        this.hitpoints -= weapon.hitpoints
        if (!this.hitpoints) this.destroy()
        return weapon.hitpoints
        // show hit animation
    }
    fire() {
        const weapon = new Weapon(
            this.container,
            this.x + this.offsetX, this.y + this.offsetY,
            'enemy',
            this.weapon
        )
        /* weapon.sound.play() */
        this.fireCooldown = weapon.cooldown
        return weapon
    }
}

export { Enemy }