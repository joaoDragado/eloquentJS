"use strict";

//        /abc/      A sequence of characters
//        /[abc]/    Any character from a set of characters
//        /[^abc]/  Any character not in a set of characters
//        /[0-9]/   Any character in a range of characters
//        /x+/      One or more occurrences of the pattern x
//        /x+?/     One or more occurrences, nongreedy
//        /x*/      Zero or more occurrences
//        /x?/      Zero or one occurrence
//        /x{2,4}/  Two to four occurrences
//        /(abc)/     A group
//        /a|b|c/     Any one of several patterns
//        /\d/      Any digit character
//        /\w/      An alphanumeric character (“word character”)
//        /\s/      Any whitespace character
//        /./       Any character except newlines
//        /\b/      A word boundary
//        /^/       Start of input
//        /$/       End of input



/*
A regular expression is a type of object. It can either be constructed with the RegExp constructor or written as a literal value by enclosing a pattern in  forward slash ( / ) characters.
*/

/*
There are a number of common character groups that have their own built-in shortcuts. 
\d Any digit character
\w An alphanumeric character (“word character”)
\s Any whitespace character (space, tab, newline, and similar)
\D A character that is not a digit
\W A nonalphanumeric character
\S A nonwhitespace character
.  Any character except for newline

To invert a set of characters—that is, to express that you want to match any character except the ones in the set—you can write a caret ( ^ ) character after the opening bracket.

When you put a plus sign ( + ) after something in a regular expression, it indicates that the element may be repeated more than once.
The star ( * ) has a similar meaning but also allows the pattern to match zero times.
A question mark (?) makes a part of a pattern optional, meaning it may occur zero or one time.

To indicate that a pattern should occur a precise number of times, use curly braces, i.e. {4}.
It is also possible to specify a range this way: {2,4} means the
element must occur at least twice and at most four times.
You can also specify open-ended ranges when using curly braces by omitting the number after the comma. So {5,} means five or more times.

// The i at the end of the expression in the example makes this regular expression case insensitive.
let re2 = /abc/i;

// When a g option (for global) is
added to the regular expression, all matches in the string will be replaced, not  just the first.

console.log("Borobudur".replace(/[ou]/g, "a"));
// → Barabadar


If we want to enforce that the match must span the whole string, we can add the markers ^ and $ . 
The caret matches the start of the input string, while the
dollar sign matches the end. 
So, /^\d+$/ matches a string consisting entirely of one or more digits, 
/^!/ matches any string that starts with an exclamation mark, and /x^/ does not match any string.

If we just want to make sure the date starts and ends on a word boundary, we can use the marker \b . 
A word boundary can be the start or end of the string or any point in the string that has a word character (as in \w ) on one side and a nonword character on the other.

The pipe character ( | ) denotes a choice between the pattern to its left and the pattern to its right.

##
We use [^] (any character that is not in the empty set of characters) as a way to match any character. 
We cannot just use a . here because block comments can continue on a new line, and the . does not match newline characters (\n).

// Non-greedy operators
The repetition operators ( + , * , ? , and {} ) are greedy, meaning they match as much as they can and backtrack from
there.
Putting a question mark after them ( +? , *? , ?? , {}? ), they become nongreedy and start by matching as little as possible, matching more only when the remaining pattern does not fit the smaller match.

## Unicode

As far as JavaScript’s regular expressions are concerned, a “word character” is only one of the 26 characters in the Latin alphabet (uppercase or lowercase), decimal digits, and the underscore character.
By a strange historical accident, \s (whitespace) does not have this problem and matches all characters that the Unicode standard considers whitespace.
You must add an u option (for Unicode) to your regular expression to make it treat such characters properly.
it is possible to use \p in a regular expression (that must
have the Unicode option enabled) to match all characters to which the Unicode standard assigns a given property.


// Regex methods

test() : outputs true/false

exec() : No match returns null.
If match, returns arrays of strings, 1st element is the string matched; the array has an index property that tells us where in
the string the successful match begins.
if the regex contains subgroups via parentheses, all the matched groups show up in the array as follows :
1st element - whole match
2st element - 1st group match, etc.
When a group does not end up being matched at all (for example, when followed by a question mark), its position in the output array will hold undefined .
Similarly, when a group is matched multiple times, only the last match ends up in the array.

replace(this, with) :
String values have a replace method, which can be used to replace part of the string with another string.

The first argument can also be a regular expression, in which case the first match of the regular expression is replaced. When a g option (for global) is added to the regular expression, all matches in the string will be replaced, not just the first.

The real power of using regular expressions with replace comes from the fact that we can refer back to matched groups in the replacement string.
The $1 and $2 in the replacement string refer to the parenthesized groups in the pattern. 
$1 is replaced by the text that matched against the first group, $2 by the second, and so on, up to $9 . 
The whole match can be referred to with $& .
 
search() : expects a regular expression, it returns the first index on which the expression was found, or -1 when it wasn’t found.

### The lastIndex property

Regular expression objects have properties. One such property is source , which contains the string that expression was created from. 
Another property is lastIndex , which controls where the next match will start , provided that :
 - the regular expression have the global (g) or sticky (y) option enabled, and 
 - the match must happen through the exec method.

If the match was successful, the call to exec automatically updates the lastIndex property to point after the match.
These automatic updates to the lastIndex property can cause problems ; your regExpr might be accidentally starting at an index that was left over from a previous call.

Another interesting effect of the (g) option is that it changes the way the match() method on strings works. 
When called with g, instead of returning an array similar to that returned by exec() , match() will find all matches of the pattern in the string and return an array containing the matched strings , ie.
console.log("Banana".match(/an/g));
// → ["an", "an"]

##CAUTION
be cautious with global regular expressions. The cases where they are necessary :
- calls to replace() and 
- places where you want to explicitly use lastIndex() ,
are typically the only places where you want to use them.
##



*/

// Examples

/*
// g for global, i for caseInsensitive
let re1 = new RegExp("abc", "gi"); 
let re2 = /abc/;

console.log(re2.test("abcde"));
// → true
console.log(re2.test("abxde"));
// → false

let notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
// → false

let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));
// → true

let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// → ["'hello'", "hello"]

console.log(/bad(ly)?/.exec("bad"));
// → ["bad", undefined]
console.log(/(\d)+/.exec("123"));
// → ["123", "3"]

console.log(/cat/.test("concatenate"));
// → true
console.log(/\bcat\b/.test("concatenate"));
// → false

let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
149// → true
console.log(animalCount.test("15 pigchickens"));
// → false


console.log("Borobudur".replace(/[ou]/, "a"));
// → Barobudur
console.log("Borobudur".replace(/[ou]/g, "a"));
// → Barabadar

console.log( "Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
            .replace(/(\w+), (\w+)/g, "$2 $1"));
// → Barbara Liskov
// John McCarthy
// Philip Wadler

let s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g,
str => str.toUpperCase()));
// → the CIA and FBI


let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(_, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) { // only one left, remove the 's'
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
      amount = "no";
    }
  return amount + " " + unit;
}

console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon, 1 cabbage, and 100 eggs


// use of non-greedy operators  
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments("x = 10;// ten!"));
// → x = 10;

let name = "harry";
let text = "Harry is a suspicious character.";
let regexp = new RegExp("\\b(" + name + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));
// → _Harry_ is a suspicious character.


console.log("word".search(/\S/));
// → 2
console.log("".search(/\S/));
// → -1

console.log(/<.>/.test("< 🌹 >"));
// → false
console.log(/<.>/u.test("< 🌹 >"));
// → true

console.log(/\p{Script=Greek}/u.test("α"));
// → true
console.log(/\p{Script=Arabic}/u.test("α"));
// → false
console.log(/\p{Alphabetic}/u.test("α"));
// → true
console.log(/\p{Alphabetic}/u.test("!"));
// → false
*/
