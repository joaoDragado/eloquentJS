// ex 5.1
/*
let source = [
              [2,4,6],
              [8,12,16],
              [22,33,66]];

let out = source.reduce((accumulator, current) => 
                        accumulator.concat(current), []);
console.log(out);
// -> [ 2, 4, 6, 8, 12, 16, 22, 33, 66 ]
*/

// ex 5.4 - Dominant writing direction


// import JOURNAL array from external file
require('./code/scripts.js');

//console.log(SCRIPTS[0]);

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

// creates an array of all directions present in text & their frequencies(count)
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

/*inputs a text passage, identifies the lang script of each character, 
uses the direction attribute of each script 
to build a frequency table of all directions present, 
outputs these as percentage frequencies.
*/
function textDirection(text) {
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

console.log(textDirection(' 英国的狗说 "woof", 俄罗斯的狗说 "тяв"'));
// → 100% ltr
// ex 5.1
/*
let source = [
              [2,4,6],
              [8,12,16],
              [22,33,66]];

let out = source.reduce((accumulator, current) => 
                        accumulator.concat(current), []);
console.log(out);
// -> [ 2, 4, 6, 8, 12, 16, 22, 33, 66 ]
*/

// ex 5.4 - Dominant writing direction


// import JOURNAL array from external file
require('./code/scripts.js');

//console.log(SCRIPTS[0]);

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

// creates an array of all directions present in text & their frequencies(count)
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

/*inputs a text passage, identifies the lang script of each character, 
uses the direction attribute of each script 
to build a frequency table of all directions present, 
outputs these as percentage frequencies.
*/
function textDirection(text) {
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

console.log(textDirection(' 英国的狗说 "woof", 俄罗斯的狗说 "тяв"'));
// → 100% ltr
