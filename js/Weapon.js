import { Token } from './Token.js'

class Weapon extends Token {
    constructor(container, x, y, {cooldown, damage, hitpoints, image, name, speed, owner, transforms} = {}) {
        super(container, 'img', x, y, {damage, hitpoints, image, name, speed, owner, transforms})
        this.cooldown = cooldown
        this.element.src = image
        this.element.id = name
        this.classList.add('weapon')
    }
}

export { Weapon }