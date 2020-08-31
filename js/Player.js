import { Token } from "./Token.js"
import { Weapon } from "./Weapon.js"

class Player extends Token {
    constructor(container, x, y, {damage, hitpoints, image, name, speed, owner, transforms, weapon} = {}) {
        super(container, 'img', x, y, {damage, hitpoints, image, name, speed, owner, transforms})
        this.element.src = image
        this.element.id = name
        this.classList.add('player')
        this.weapon = weapon
        this.weapon.owner = this.name
    }
    defend(token){}
    fire() {
        return new Weapon(this.container, this.x, this.y, this.weapon)
    }
}

export { Player }