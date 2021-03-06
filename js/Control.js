class Control {
    // handels basic functions for graphical interactions
    // Control([htmlElement || id || container, htmlType, x, y, [transforms]])
    constructor() {

        var transforms = undefined

        this.container = undefined
        this.element = undefined
        this.events = []
        this.x = 0
        this.y = 0
        this.transforms = []

        if (arguments.length > 1) {
            const container = arguments[0]
            const htmlType = arguments[1]
            const x = arguments[2]
            const y = arguments[3]
            transforms = arguments[4]
            this.x = x
            this.y = y
            if (container) {
                this.container = container
                this.element = document.createElement(htmlType)
                this.container.appendChild(this.element)
            }
        }else if (arguments.length === 1) {
            if (typeof arguments[0] === 'string') {
                this.element = document.getElementById(arguments[0])
            }else{
                this.element = arguments[0]
            }
            this.container = this.element.parentElement
        }
        if (this.element) {
            this.setPosition(this.x, this.y)
            if (transforms) transforms.forEach(trs => this.setTransform(trs))
        }

    }
    get children() {
        const result = {}
        for (const child of this.element.children) {
            result[child.id] = child
        }
        return result
    }
    get classList() {
        return this.element.classList
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
    get id() {
        return this.element.id
    }
    get width() {
        return this.element.getBoundingClientRect().width
    }
    set width(val) {
        this.element.style.width = val + 'px'
    }
    addEventListener(event, callback) {
        this.element.addEventListener(event, callback)
        if (!this.events[event]) this.events[event] = []
        this.events[event].push(callback)
    }
    dispatchEvent(event) {
        this.element.dispatchEvent(event)
    }
    hide() {
        this.element.style.display = 'none'
    }
    isVisible() {
        return !(this.element.style.display === 'none' || this.element.style.display === '')
    }
    setPosition(...args) {
        this.x = args[0] || this.x
        this.y = args[1] || this.y
        this.setTransform(`translate(${this.x}px, ${this.y}px)`)
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

export { Control }