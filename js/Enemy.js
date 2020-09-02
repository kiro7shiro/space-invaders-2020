import { Token } from "./Token.js"

class Enemy extends Token {
    constructor(container, x, y, {damage, hitpoints, image, name, speed, transforms, owner, weapon} = {}) {
        super(container, 'img', x, y, {damage, hitpoints, image, name, speed, transforms, owner})
        this.element.src = image
        this.element.id = name
        this.classList.add('enemy')
        this.weapon = weapon
        this.weapon.owner = 'enemy'
    }
    defend(token){}
    fire() {
        return new Weapon(this.container, this.x, this.y, this.weapon)
    }
}

export { Enemy }