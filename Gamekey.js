import { Emitter } from './Emitter.js'

class Gamekey extends Emitter {
    constructor(code) {
        super()
        this.code = code
        this.down = false
        this.up = false

        this.on('down', () => {this.down = true; this.up = false})
        this.on('up', () => {this.down = false; this.up = true})
    }
}

export { Gamekey }