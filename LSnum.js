// LSnum: Based off aarex's "logarithmica numerus lite"
// Made with love by Mefistic! <3

class LSnum
{
	constructor(num)
	{
		if (num.l) this.l = num.l
		if (typeof(num) == 'string')
		{
			var indexE = num.indexOf('e')
			
			if (indexE == -1)
			{
				this.l = Math.log10(num)
			}
			
			else if (indexE == 0)
			{
				this.l = Number(num.substring(1))
			}
			
			else
			{
				this.l = Math.log10(num.substring(0, indexE)) + Number(num.substring(indexE+1))
			}
		}
		else if (typeof(num) == 'number') this.l = Math.log10(num)
	}
	
	add(x)
	{
		x = new LS(x)
		var expDiff = this.l - x.l
		if (expDiff >= 15 || expDiff <= -15) return { l: Math.max(this.l, x.l) }
		return { l: x.l + Math.log10(1 + Math.pow(10, expDiff)) }
	}

	sub(x)
	{
		x = new LS(x)
		var expDiff = this.l - x.l
		if (expDiff < 0) return { l: Number.NEGATIVE_INFINITY }
		if (expDiff >= 15) return { l: this.l }
		return { l: x.l + Math.log10(1 - Math.pow(10, -expDiff)) }
	}

	mul(x)
	{
		x = new LS(x)
		return { l: this.l + x.l}
	}

	div(x)
	{
		x = new LS(x)
		return { l: this.l - x.l}
	}

	pow(x)
	{
		return { l: this.l * x }
	}

	sqr()
	{
		return { l: this.l * 2 }
	}

	cub()
	{
		return { l: this.l * 3 }
	}

	root(x)
	{
		return { l: this.l / x }
	}

	sqrt()
	{
		return { l: this.l / 2 }
	}

	cbrt()
	{
		return { l: this.l / 3 }
	}

	log10()
	{
		return { l: Math.log10(this.l)}
	}

	log2()
	{
		return { l: this.l / 3.32192809488736234787 }
	}

	log(x)
	{
		x = new LS(x)
		return { l: this.l / x.l }
	}

	floor()
	{
		if (this.l < 0) return { l: Number.NEGATIVE_INFINITY }
		if (this.l < 15) return { l: Math.log10(Math.floor(Math.pow(10, this.l) + Math.pow(10, this.l - 14))) }
	}

	ceil()
	{
		if (this.l == Number.NEGATIVE_INFINITY) return { l: Number.NEGATIVE_INFINITY }
		if (this.l < 0) return { l: 0 }
		if (this.l < 15) return { l: Math.log10(Math.ceil(Math.pow(10, this.l) - Math.pow(10, this.l - 14))) }
	}

	round()
	{
		if (this.l <= -1) return { l: Number.NEGATIVE_INFINITY }
		if (this.l < 15) return { l: Math.log10(Math.round(Math.pow(10, this.l))) }
	}

	toFixed(x)
	{
		if (this.l < -x - 1) return (0).toFixed(x)
		if (this.l == Number.POSITIVE_INFINITY) return 'Infinity'
		if (this.l >= 1e21) return 'e' + this.l
		if (this.l >= 21) return Math.pow(10, this.l - Math.floor(this.l)).toFixed(x) + 'e' + Math.floor(this.l)
		return Math.pow(10, this.l).toFixed(x)
	}

	min(x)
	{
		x = new LS(x)
		return { l: Math.min(this.l, x.l) }
	}

	max(x)
	{
		x = new LS(x)
		return { l: Math.max(this.l, x.l) }
	}

	cmp(x)
	{
		x = new LS(x)
		if (this.l > x.l) return 1
		if (this.l == x.l) return 0
		if (this.l < x.l) return -1
	}

	lt(x)
	{
		x = new LS(x)
		return this.l < x.l
	}

	lte(x)
	{
		x = new LS(x)
		return this.l <= x.l
	}

	eq(x)
	{
		x = new LS(x)
		return this.l == x.l
	}

	gt(x)
	{
		x = new LS(x)
		return this.l > x.l
	}

	gte(x)
	{
		x = new LS(x)
		return this.l >= x.l
	}

	get e()
	{
		if (this.l == Number.NEGATIVE_INFINITY) return 0
		return Math.floor(this.l)
	}

	get m()
	{
		if (this.l == Number.NEGATIVE_INFINITY) return 0
		return Math.pow(10, this.l - Math.floor(this.l))
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