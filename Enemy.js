import { Entity } from './Entity.js'
import { Weapon } from './Weapon.js'

class Enemy extends Entity {
    constructor(container, x, y, {cooldown, hitpoints, image, speed, weapon} = {}) {
        super(container, 'img', x, y)
        this.element.src = image
        this.element.id = 'enemy'

        this.cooldown = cooldown
        this.hitpoints = hitpoints
        this.speed = speed
        this.weapon = weapon
    }
    fire() {
        const weapon = new Weapon(
            this.container,
            this.x + this.offsetX, this.y + this.offsetY,
            'enemy',
            this.weapon
        )
        /* weapon.sound.play() */
        this.cooldown = weapon.cooldown
        return weapon
    }
}

export { Enemy }