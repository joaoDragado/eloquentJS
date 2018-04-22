/*
This makes sure the data is exported in node.js —
`require('./path/to/jaques_journal.js')` will get you the array.

Needs the following snippet to be present in the source file :

if (typeof module != "undefined" && module.exports && (typeof window == "undefined" || window.exports != exports))
  module.exports = JOURNAL;
if (typeof global != "undefined" && !global.JOURNAL)
  global.JOURNAL = JOURNAL;
*/
// import JOURNAL array from external file
require('./code/scripts.js');

//console.log(SCRIPTS.length);
// console.log(SCRIPTS[0]);



// this adds all the character ranges of each language
// count is used for the langs that dont have a Unicode range 
function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}
// this is using reduce to find the max of our range.
/* console.log(SCRIPTS.reduce((a, b) => {
  return characterCount(a) < characterCount(b) ? b : a;
})); */
// → {name: "Han", ...}


// some - every
/*
some takes a test function and tells you if that function returns true for any of the elements in the array. 
every returns true when the given function returns true for every element in the array.
In a way, some is a version of the || operator that acts on arrays, and every is like the && operator.
*/

// Figuring out what language script a piece of text is using

// this function checks if a character code is within a language's range
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(
                           ([from, to]) => 
                           code >= from && code < to)) {
      return script;
    }
  }
  return null;
}
//console.log(characterScript(121));
//→ {name: "Latin", ...}

/*
JavaScript strings are encoded as a sequence of 16-bit numbers, a.k.a. code units. It describes most common characters using a single 16-bit code unit, but uses a pair of two such units for others (a bad idea).
JavaScript’s charCodeAt method gives you a code unit, not a full character code. The codePointAt method, added later, does give a full Unicode character.
But the argument passed to codePointAt is still an index into the sequence of code units. So to run over all characters in a string, we’d still need to deal with the question of whether
a character takes up one or two code units. (see ex below)

// Two emoji characters, horse and shoe
let horseShoe = " 🐴👟 ";
console.log(horseShoe.length);
// → 4

console.log(horseShoe[0]);
// → (Invalid half-character)

console.log(horseShoe.charCodeAt(0));
// → 55357 (Code of the half-character)

console.log(horseShoe.codePointAt(0));
// → 128052 (Actual code for horse emoji)

Like codePointAt , the for / of loop was introduced at a time where people were acutely aware of the problems with UTF-16. When you use it to loop over a string, it gives you real characters, not code units.

let roseDragon = " 🌹🐉 ";
for (let char of roseDragon) {
console.log(char);
}
// → 🌹
// → 🐉
*/

// count the characters that belong to each script.
/*
The countBy function expects a collection (anything that we can loop over with for / of ) and a grouping function. It returns an array of objects, each of which names a group and tells you the amount of elements that were found in that group.
*/
function countBy(items, groupFunc) {
  let counts = [];
  for (let item of items) {
    let direction = groupFunc(item);
    // check if groupFunc(item) is in counts
    let known = counts.findIndex(c => c.direction == direction);
    // if not, add an entry & init its count
    if (known == -1) {
      counts.push({direction, count: 1});
    } else {
      // else if present, increment its count
      counts[known].count++;
    }
  }
  return counts;
}

//console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]

/*
let text = 'Never can mean ποτέ, δίχως, ούτε.'
console.log(countBy(text, 
             // our groupFunc is countBy of each char in the text
             char => {
              let lang =  characterScript(char.codePointAt(0));
                // if lang in scripts, return lang name , else none
                return lang ? lang.name : 'none'; 
              }).filter(
                  // filter out the none class
                  ({name}) => name != 'none'));

// -> [ { name: 'Latin', count: 12 }, { name: 'Greek', count: 13 } ]
*/


// findIndex 
/*This method is somewhat like indexOf , but instead of looking for a specific value, it finds the first value for which the given function returns true. Like indexOf , it returns -1 when no such element is found.*/

/*Using :
The function first counts the characters by name, using characterScript to
assign them a name, and falling back to the string "none" for characters that
aren’t part of any script. 
The filter call drops the entry for "none" from the resulting array, since we aren’t interested in those characters.
To be able to compute percentages, we first need the total amount of characters that belong to a script, which we can compute with reduce . 
If no such characters are found, the function returns a specific string. Otherwise, it transforms the counting entries into readable strings with map , and then combine them with join .*/


function textScripts(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  }).filter(({direction}) => direction != "none");
  
  let total = scripts.reduce((n, {count}) => n + count, 0);
  if (total == 0) return "No scripts found";
  
  return scripts.map(({direction, count}) => {
    return `${Math.round(count * 100 / total)}% ${direction}`;
  }).join(", ");
}

console.log(textScripts(' 英国的狗说 "woof", 俄罗斯的狗说 "тяв"'));
// → 100% ltr

