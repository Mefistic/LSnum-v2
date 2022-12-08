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
		x = new LSnum(x)
		var expDiff = this.l - x.l
		if (expDiff >= 15) return this
		if (expDiff <= -15) return x
		this.l = this.l + Math.log10(1 + Math.pow(10, expDiff))
		return x
	}

	sub(x)
	{
		x = new LSnum(x)
		var expDiff = this.l - x.l
		if (expDiff < 0)
		{
			this.l = -Infinity
			return this
		}
		if (expDiff >= 15 || x.l == -Infinity) return this
		this.l = this.l + Math.log10(1 - Math.pow(10, -expDiff))
		return this
	}

	mul(x)
	{
		x = new LSnum(x)
		this.l = this.l + x.l
		return this
	}

	div(x)
	{
		x = new LSnum(x)
		this.l = this.l - x.l
		return this
	}

	pow(x)
	{
		x = new LSnum(x)
		this.l = this.l * Math.pow(10, x.l)
		return new LSnum(this)
	}

	root(x)
	{
		x = new LSnum(x)
		this.l = this.l / Math.pow(10, x.l)
		return new LSnum(this)
	}

	log(x)
	{
		x = new LSnum(x)
		this.l = this.l / x.l
		return new LSnum(this.l)
	}

	floor()
	{
		if (this.l < 0) this.l = -Infinity
		else if (this.l < 15) this.l = Math.log10(Math.floor(Math.pow(10, this.l) + Math.pow(10, this.l - 14)))
		return this
	}

	ceil()
	{
		if (this.l == -Infinity) this.l = -Infinity
		else if (this.l < 0) this.l = 0
		else if (this.l < 15) this.l = Math.log10(Math.ceil(Math.pow(10, this.l) - Math.pow(10, this.l - 14)))
		return this
	}

	trunc()
	{
		if (this.l < 0) this.l = -Infinity
		else if (this.l < 15) this.l = Math.trunc(this.l)
		return this
	}

	round()
	{
		if (this.l <= -0.30102999566398) this.l = -Infinity
		if (this.l < 15) return this.l = Math.log10(Math.round(Math.pow(10, this.l)))
		return this
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
		x = new LSnum(x)
		this.l = Math.min(this.l, x.l)
		return this
	}

	max(x)
	{
		x = new LSnum(x)
		this.l = Math.max(this.l, x.l)
		return this
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

function scientificNotation(x, d=3, d2=3)
{
	x = LS(x)
	dFormula = Math.max(-x.e + d, 0)
	d2Formula = Math.max(-Math.log10(x.e / 10) + d2, 0)
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