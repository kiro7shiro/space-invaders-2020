import { Control } from './Control.js'

class Token extends Control {
    // handels basic game logic
    constructor(container, htmlType, x, y, {damage, hitpoints, image, name, speed, owner, transforms} = {}) {
        super(container, htmlType, x, y, transforms)
        this.damage = damage
        this.hitpoints = hitpoints
        this.image = image
        this.isDead = false
        this.name = name
        this.speed = speed
        this.owner = owner
    }
    destroy() {
        this.container.removeChild(this.element)
        this.isDead = true
    }
    hit(token) {
        return !(
            this.hitbox.left > token.hitbox.right ||
            this.hitbox.right < token.hitbox.left ||
            this.hitbox.top > token.hitbox.bottom ||
            this.hitbox.bottom < token.hitbox.top
        )
    }
}

export { Token }