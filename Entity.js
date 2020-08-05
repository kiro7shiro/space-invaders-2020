class Entity {
    constructor(container, type, x, y) {
        this.container = container
        this.element = document.createElement(type)
        this.container.appendChild(this.element)
        this._lastHit = 0
        this.offsetX = 0
        this.offsetY = 0
        this.x = x || 0
        this.y = y || 0
        this.transforms = []
        this.setPosition(this.x, this.y)
    }
    get height() {
        return this.element.height
    }
    get hitbox() {
        return this.element.getBoundingClientRect()
    }
    get lastHit() {
        return this._lastHit
    }
    set lastHit(val) {
        this._lastHit = val
        if (!this.element.classList.contains('hit')) {
            this.element.classList.add('hit')
        }
    }
    get width() {
        return this.element.width
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
    offset(x, y) {
        this.offsetX = x
        this.offsetY = y
        x += this.x
        y += this.y
        this.setTransform(`translate(${x}px, ${y}px)`)
    }
    rotate(deg) {
        this.setTransform(`rotate(${deg}deg)`)
    }
    setPosition(x , y) {
        this.x = x
        this.y = y
        this.setTransform(`translate(${x}px, ${y}px)`)
    }
    setTransform(style) {
        var fnName = style.substring(0, style.indexOf('('))
        var idx = this.transforms.findIndex(trf => trf.name === fnName)
        if (idx > -1) { 
            this.transforms[idx].style = style
        }else{
            this.transforms.push({
                name : fnName,
                style : style
            })
        }
        var transform = ''
        this.transforms.forEach(trf => {
            transform += trf.style + ' '
        })
        this.element.style.transform = transform
    }
    wasHit(dt) {
        if (this.element.classList.contains('hit') && dt >= 300) {
            this.element.classList.remove('hit')
        }
    }
}

export { Entity }