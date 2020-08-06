import { Gametoken } from './Gametoken.js'

class Weapon extends Gametoken {
    constructor(container, x, y, owner, {cooldown, hitpoints, id, image, sound, speed, transforms} = {}) {
        super(container, 'img', x, y, {cooldown, hitpoints, sound, speed, transforms})
        this.element.src = image
        this.element.id = id
        this.owner = owner
    }
}

export { Weapon }