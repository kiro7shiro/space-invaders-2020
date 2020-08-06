import { Entity } from './Entity.js'

class Gametoken extends Entity {
    constructor(container, type, x, y, {cooldown, hitpoints, sound, speed, transforms, weapon} = {}) {
        super(container, type, x, y, {transforms})
 
        this.cooldown = cooldown
        this.hitpoints = hitpoints
        this.isDead = false
        this.sound = new Audio(sound)
        this.speed = speed
        this.weapon = weapon
        
    }
    destroy() {
        this.container.removeChild(this.element)
        this.isDead = true
    }
    hit(entity) {
        return !(
            this.hitbox.left > entity.hitbox.right ||
            this.hitbox.right < entity.hitbox.left ||
            this.hitbox.top > entity.hitbox.bottom ||
            this.hitbox.bottom < entity.hitbox.top
        )
    }
}

export { Gametoken }