/**
 * Get a random number between min and max.
 * @param {Number} min Minimum of the range
 * @param {Number} max Maximum of the range
 * @param {Number} decimals Decimal places of random number
 * @returns {Number} A new random Number
 */
function getRandomNumber(min, max, decimals) {
    if (!min) min = 0
    if (!max) max = 1
    try {
        var rnd = Math.random() * (max - min) + min
        if (decimals > -1) rnd = round(rnd, decimals)
        return rnd
    } catch (err) {
        throw err
    }
}
/**
 * Round a value to decimals count
 * code found at:
 * https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
 * @param {Number} num Number to round
 * @param {Number} decimals Decimal places after rounding
 * @returns {Number} New rounded number
 */
function round(num, decimals) {
    try {
        if(!("" + num).includes("e")) {
            return +(Math.round(num + "e+" + decimals)  + "e-" + decimals)
            } else {
            var arr = ("" + num).split("e")
            var sig = ""
            if(+arr[1] + decimals > 0) {
                sig = "+"
            }
            return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + decimals)) + "e-" + decimals)
            }
    } catch (err) {
        throw err
    }
}

export { getRandomNumber, round }