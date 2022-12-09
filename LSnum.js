// LSnum: Based off aarex's "logarithmica numerus lite"
// Made with love by Mefistic! <3
class LSnum
{
	constructor(num = 0)
	{
		if (num instanceof LSnum) this.l = num.l

		if (typeof(num) == 'string')
		{
			var indexE = num.indexOf('e')
			
			if (indexE == -1) this.l = Math.log10(num)
			
			else if (indexE == 0) this.l = Number(num.substring(1))
			
			else this.l = Math.log10(num.substring(0, indexE)) + Number(num.substring(indexE+1))
		}
		else if (typeof(num) == 'number') this.l = Math.log10(num)
	}

	add(x)
	{
		var ret = new LS(this)
		x = new LSnum(x)
		var expDiff = ret.l - x.l
		if (expDiff >= 15 || x.l == -Infinity) return ret
		if (expDiff <= -15 || ret.l == -Infinity) return x
		ret.l = x.l + Math.log10(1 + Math.pow(10, expDiff)) + 1e-14
		return ret
	}

	sub(x)
	{
		var ret = new LS(this)
		x = new LSnum(x)
		var expDiff = ret.l - x.l
		if (expDiff < 0)
		{
			ret.l = -Infinity
			return ret
		}
		if (expDiff >= 15 || x.l == -Infinity) return ret
		ret.l = ret.l + Math.log10(1 - Math.pow(10, -expDiff)) + 1e-14
		return ret
	}

	mul(x)
	{
		var ret = new LS(this)
		x = new LSnum(x)
		ret.l = ret.l + x.l + 1e-14
		return ret
	}

	div(x)
	{
		var ret = new LS(this)
		x = new LSnum(x)
		ret.l = ret.l - x.l + 1e-14
		return ret
	}

	pow(x)
	{
		var ret = new LS(this)
		x = new LSnum(x)
		ret.l = ret.l * Math.pow(10, x.l) + 1e-14
		return ret
	}

	root(x)
	{
		var ret = new LS(this)
		x = new LSnum(x)
		ret.l = ret.l / Math.pow(10, x.l) + 1e-14
		return ret
	}

	log(x)
	{
		var ret = new LS(this)
		x = new LSnum(x)
		ret.l = ret.l / x.l
		return new LSnum(ret.l + 1e-14)
	}

	floor()
	{
		var ret = new LS(this)
		if (ret.l < 0) ret.l = -Infinity
		else if (ret.l < 15) ret.l = Math.log10(Math.floor(Math.pow(10, ret.l))) + 1e-14
		return ret
	}

	ceil()
	{
		var ret = new LS(this)
		if (ret.l == -Infinity) ret.l = -Infinity
		else if (ret.l < 0) ret.l = 0
		else if (ret.l < 15) ret.l = Math.log10(Math.ceil(Math.pow(10, ret.l))) + 1e-14
		return ret
	}

	trunc()
	{
		var ret = new LS(this)
		if (ret.l < 0) ret.l = -Infinity
		else if (ret.l < 15) ret.l = Math.log10(Math.trunc(Math.pow(10, ret.l))) + 1e-14
		return ret
	}

	round()
	{
		var ret = new LS(this)
		if (ret.l <= -0.30102999566398) ret.l = -Infinity
		if (ret.l < 15) ret.l = Math.log10(Math.round(Math.pow(10, ret.l))) + 1e-14
		return ret
	}

	toFixed(x)
	{
		if (this.l < -x - 1) return (0).toFixed(x)
		if (this.l == Infinity) return 'Infinity'
		if (this.l >= 1e21) return 'e' + this.l
		if (this.l >= 21) return Math.pow(10, this.l - Math.trunc(this.l)).toFixed(x) + 'e' + Math.trunc(this.l)
		return Math.pow(10, this.l).toFixed(x)
	}

	toNumber()
	{
		return Math.pow(10, this.l)
	}

	min(x)
	{
		var ret = new LS(this)
		x = new LSnum(x)
		ret.l = Math.min(ret.l, x.l)
		return ret
	}

	max(x)
	{
		var ret = new LS(this)
		x = new LSnum(x)
		ret.l = Math.max(ret.l, x.l)
		return ret
	}

	lt(x)
	{
		x = new LSnum(x)
		return this.l < x.l
	}

	lte(x)
	{
		x = new LSnum(x)
		return this.l <= x.l
	}

	eq(x)
	{
		x = new LSnum(x)
		return this.l == x.l
	}

	gt(x)
	{
		x = new LSnum(x)
		return this.l > x.l
	}

	gte(x)
	{
		x = new LSnum(x)
		return this.l >= x.l
	}

	get e()
	{
		if (this.l == -Infinity) return 0
		return Math.trunc(this.l)
	}

	get m()
	{
		if (this.l == -Infinity) return 0
		return Math.pow(10, this.l - Math.trunc(this.l))
	}

	toString()
	{
		return this.m + 'e' + this.e
	}

	toJSON()
	{
		return this.toString()
	}
}

// QoL !!!

// LS() Function will redirect you to the actual class.
// It's handy because you don't have to write as much.

function LS(x)
{
	return new LSnum(x)
}

// This function will format the number in Scientific Notation.
// It's always nice to have some sort of preformatting, writing these suck!

function scientific(x, places = 0, placesOver1000 = 2)
{
	x = LS(x.toFixed(10))
	var dFormula = Math.max(-x.e + places, 0)
	var d2Formula = Math.max(-Math.log10((x.e + placesOver1000) / 10) + 3, 0)
	if (LS(x.toFixed(dFormula)).lt(1000))
	{
		return x.toFixed(dFormula)
	}
	if (x.lt('e1e15'))
	{
		if (x.m.toFixed(d2Formula) == 10)
		{
			return (1).toFixed(d2Formula) + 'e' + (x.e + 1)
		}
		return x.m.toFixed(d2Formula) + 'e' + x.e
	}
	return 'e' + scientificNotation(x.e, 0, 5)
}