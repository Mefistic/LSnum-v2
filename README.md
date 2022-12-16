# LSnum v2
Remake of my other library, LSnum.

# Documentation
To make a LS object, use the following function:
```javascript
LS(Number)
```

LS Operations:
```javascript
add(x)         <- Adds (x) to a number.
sub(x)         <- Subtracts a number by (x)
mul(x)         <- Multiplies a number by (x)
div(x)         <- Divides a number by (x)
pow(x)         <- Raises a number to the power of (x)
root(x)        <- Takes the Factor (x) Root of a number.
log(x)         <- Takes the Base (x) Logarithm of a number.
floor()        <- Rounds a number down;
ceil()         <- Rounds a number up;
round()        <- Rounds a number;
trunc()        <- Removes decimal places from a number;
min(x)         <- Minimum between two numbers.
max(x)         <- Maximum between two numbers.
lt(x)          <- Returns True if Less Than. (<)
lte(x)         <- Returns True if Less Than or Equal To. (<=)
eq(x)          <- Returns True if Equal To (==)
gt(x)          <- Returns True if Greater Than (>)
gte(x)         <- Returns True if Greater Than or Equal To (>=)
```

LS Other:
```javascript
toFixed(x)     <- Converts object into a string with (x) decimal places.
toNumber()     <- Converts object into a regular number.
toString()     <- Converts object into a string with maximum precision.
toJSON()       <- Redirects to toString()
LS(x).e        <- Exponent (e)
LS(x).m        <- Mantissa (m)

LSformat(x, places, placSci) <- Scientific Notation
```

Note: Quotes are needed when a number is beyond normal Javascript limits.
