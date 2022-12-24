// LSnum: Based off aarex's "logarithmica numerus lite"
// Made with love by Mefistic! <3

const LSN_EPSILON = 3.553e-15 // Number to add to all results. This prevents rounding errors, but numbers might be just a tiny bit bigger.
const LSN_MIXED = [undefined, `k`, `M`, `B`, `T`, `Qd`, `Qt`, `Sx`, `Sp`, `Oc`]

class LSN {
    constructor(num = 0) {
        if (num instanceof LSN) this.l = num.l

        if (typeof num == "string") {
            var indexE = num.indexOf("e")

            if (indexE == -1) this.l = Math.log10(num)
            else if (indexE == 0) this.l = Number(num.substring(1))
            else this.l = Math.log10(num.substring(0, indexE)) + Number(num.substring(indexE + 1))
        } else if (typeof num == "number") this.l = Math.log10(num)
    }

    add(x) {
        var ret = new LSN(this)
        x = new LSN(x)
        var expDiff = ret.l - x.l
        if (expDiff >= 15 || x.l == -Infinity) return ret
        if (expDiff <= -15 || ret.l == -Infinity) return x
        ret.l = x.l + Math.log10(1 + Math.pow(10, expDiff)) + LSN_EPSILON
        return ret
    }

    sub(x) {
        var ret = new LSN(this)
        x = new LSN(x)
        var expDiff = ret.l - x.l
        if (expDiff < 0) {
            ret.l = -Infinity
            return ret
        }
        if (expDiff >= 15 || x.l == -Infinity) return ret
        ret.l = ret.l + Math.log10(1 - Math.pow(10, -expDiff)) + LSN_EPSILON
        return ret
    }

    mul(x) {
        var ret = new LSN(this)
        x = new LSN(x)
        ret.l = ret.l + x.l + LSN_EPSILON
        return ret
    }

    div(x) {
        var ret = new LSN(this)
        x = new LSN(x)
        ret.l = ret.l - x.l + LSN_EPSILON
        return ret
    }

    pow(x) {
        var ret = new LSN(this)
        x = new LSN(x)
        ret.l = ret.l * Math.pow(10, x.l) + LSN_EPSILON
        return ret
    }

    root(x) {
        var ret = new LSN(this)
        x = new LSN(x)
        ret.l = ret.l / Math.pow(10, x.l) + LSN_EPSILON
        return ret
    }

    log(x) {
        var ret = new LSN(this)
        x = new LSN(x)
        ret.l = ret.l / x.l + LSN_EPSILON
        return new LSN(Math.max(ret.l, 0))
    }

    floor() {
        var ret = new LSN(this)
        if (ret.l < 15) ret.l = Math.log10(Math.floor(Math.pow(10, ret.l + LSN_EPSILON)))
        return ret
    }

    ceil() {
        var ret = new LSN(this)
        if (ret.l < 15) ret.l = Math.log10(Math.ceil(Math.pow(10, ret.l + LSN_EPSILON)))
        return ret
    }

    trunc() {
        var ret = new LSN(this)
        if (ret.l < 15) ret.l = Math.log10(Math.trunc(Math.pow(10, ret.l + LSN_EPSILON)))
        return ret
    }

    round() {
        var ret = new LSN(this)
        if (ret.l < 15) ret.l = Math.log10(Math.round(Math.pow(10, ret.l + LSN_EPSILON)))
        return ret
    }

    toFixed(x) {
        if (this.l < -x - 1) return (0).toFixed(x)
        if (this.l == Infinity) return "Infinity"
        if (this.l >= 1e21) return "e" + this.l
        if (this.l >= 21) return Math.pow(10, this.l - Math.trunc(this.l)).toFixed(x) + "e" + Math.trunc(this.l)
        return Math.pow(10, this.l).toFixed(x)
    }

    toNumber() {
        return Math.pow(10, this.l)
    }

    min(x) {
        var ret = new LSN(this)
        x = new LSN(x)
        ret.l = Math.min(ret.l, x.l)
        return ret
    }

    max(x) {
        var ret = new LSN(this)
        x = new LSN(x)
        ret.l = Math.max(ret.l, x.l)
        return ret
    }

    lt(x) {
        x = new LSN(x)
        return this.l * LSN_EPSILON < x.l * LSN_EPSILON
    }

    lte(x) {
        x = new LSN(x)
        return this.l * LSN_EPSILON <= x.l * LSN_EPSILON
    }

    eq(x) {
        x = new LSN(x)
        return this.l * LSN_EPSILON == x.l * LSN_EPSILON
    }

    gt(x) {
        x = new LSN(x)
        return this.l * LSN_EPSILON > x.l * LSN_EPSILON
    }

    gte(x) {
        x = new LSN(x)
        return this.l * LSN_EPSILON >= x.l * LSN_EPSILON
    }

    softcap(start, power) {
        power = 1 / power
        start = new LSN(start)
        if (this.l < start.l) return this
        return this.div(this.root(power)).mul(start.root(power))
    }

    get e() {
        if (this.l == -Infinity) return 0
        return Math.trunc(this.l)
    }

    get m() {
        if (this.l == -Infinity) return 0
        return Math.pow(10, this.l - Math.trunc(this.l))
    }

    toString() {
        return this.m + "e" + this.e
    }

    toJSON() {
        return this.toString()
    }

    static sci(x, places = 2, placSci = 2) {
        x = new LSN(x)
        if (x.l == Infinity) return `Infinity`
        if (isNaN(x.l)) return `NaN`

        if (x.toFixed(places) >= 1e1) places = Math.max(places - 1, 0)
        if (x.toFixed(places) >= 1e2) places = Math.max(places - 1, 0)
        if (x.toFixed(places) < 1e3) return x.toFixed(places)

        if (x.lt(`1e100000000000`)) {
            if (x.m.toFixed(placSci) == 10) return (1).toFixed(placSci) + `e` + (x.e + 1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
            else return x.m.toFixed(placSci) + `e` + x.e.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }

        return `e` + LSN.sci(x.l, 0, 5)
    }

    static mix(x, places = 2) {
        x = new LSN(x)
        if (x.l == -Infinity) return `0`

        if (x.toFixed(places) < 1e3) {
            places = Math.max(places - Math.trunc(x.l), 0)
            return x.toFixed(places)
        }

        if (x.toFixed(places) < 1e30) {
            var e3 = Math.trunc(x.l / 3)
            places = Math.max((-x.e % 3) + 2, 0)
            if (x.div(`e${e3 * 3}`).toFixed(places) + LSN_MIXED[e3] == `1000${LSN_MIXED[e3]}`) {
                return (1).toFixed(places) + LSN_MIXED[e3 + 1]
            }
            return x.div(`e${e3 * 3}`).toFixed(places) + LSN_MIXED[e3]
        }

        return LSN.sci(x, places, 2)
    }
}

function LS(x) {
    return new LSN(x)
}
