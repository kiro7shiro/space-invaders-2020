class Entity {
    constructor(container, type, x, y, {transforms} = {}) {
        this.offsetX = 0
        this.offsetY = 0
        this.x = x || 0
        this.y = y || 0
        this.transforms = []
        if (container) {
            this.container = container
            this.element = document.createElement(type)
            this.container.appendChild(this.element)
            this.setPosition(this.x, this.y)
        }
        if (transforms) transforms.forEach(trs => this.setTransform(trs))
    }
    get height() {
        return this.element.getBoundingClientRect().height
    }
    set height(val) {
        this.element.style.height = val + 'px'
    }
    get hitbox() {
        return this.element.getBoundingClientRect()
    }
    get width() {
        return this.element.getBoundingClientRect().width
    }
    set width(val) {
        this.element.style.width = val + 'px'
    }
    hide() {
        this.element.style.display = 'none'
    }
    isVisible() {
        return !(this.element.style.display === 'none')
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
    show() {
        this.element.style.display = 'block'
    }
}

export { Entity }