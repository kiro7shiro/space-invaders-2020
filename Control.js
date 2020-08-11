function Control() {
    Control.prototype.any = 'any'
    Control.prototype.test = function() {
        console.log(this,this.constructor.name + ' - test')
    }
}

function Menu() {
    this.test = function() {
        console.log(this, this.constructor.name + ' - test menu')
    }
}
Menu.prototype = Object.create(Control.prototype)

export { Control, Menu }