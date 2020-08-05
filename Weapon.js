import { Entity } from './Entity.js'

class Weapon extends Entity {
    constructor(container, x, y, owner, {id, cooldown, image, sound, transforms} = {}) {
        super(container, 'img', x, y)
        this.element.src = image
        this.element.id = id

        this.cooldown = cooldown
        this.sound = new Audio(sound)
        this.speed = 600
        this.owner = owner

        transforms.forEach(trs => this.setTransform(trs))
    }
}

export { Weapon }