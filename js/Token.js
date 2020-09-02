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

        this.classList.add('control')

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
    outOfBounds() {
        const hitbox = this.container.getBoundingClientRect()
        return (
            this.hitbox.top < hitbox.top ||
            this.hitbox.left < hitbox.left ||
            this.hitbox.bottom > hitbox.bottom ||
            this.hitbox.right > hitbox.right
        )
    }
}

export { Token }