import { Control } from './Control.js'

class Menu extends Control {
    constructor() {
        super(...arguments)
        this.element.addEventListener('submit', this.submit.bind(this))
    }
    static data(element) {
        const fData = new FormData(element)
        const result = {}
        for (const pair of fData.entries()) {
            result[pair[0]] = pair[1]
        }
        return result
    }
    submit(event) {
        event.preventDefault()
        if (event.target.action) {
            const action = event.target.action.replace(location.origin + '/', '')
            this.dispatchEvent(new CustomEvent(action))
        }
    }
}

export { Menu }