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
require('./code/jacques_journal.js');

//console.log(JOURNAL.length);
//console.log(JOURNAL[0]);

let pos = 0, neg = 0;
for (let entry of JOURNAL) {
    entry.squirrel? pos++ : neg++ ;
}

//console.log(`Positives : ${pos} , Negatives : ${neg}`);

/*
To compute the measure of correlation between two Boolean variables, we can use the phi coefficient ( φ ). 
This is a formula whose input is a frequency table containing the amount of times the different combinations of the variables
were observed. 
The output of the formula is a number between -1 and 1 that
describes the correlation.
*/

/*This is the function that computes the φ coefficient from array with the following properties :

We can represent a two-by-two table in JavaScript with a four-element array. 
We interpret the indices to the array as two-bit binary numbers, where the leftmost (most significant) digit refers to the dependant variable (responce) and the rightmost (least significant) digit refers to the independant variable (predictor).
*/

function phi([n00, n01, n10, n11]) {
  let numerator = (n11 * n00 - n10 * n01);
  let denominator = Math.sqrt((n10 + n11) * (n00 + n01) *
  (n01 + n11) * (n00 + n10));
  return  Number((numerator / denominator).toPrecision(2));
  ;
}

/* Same phi function using the container object as argument.
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
  Math.sqrt((table[2] + table[3]) * (table[0] + table[1]) *
          (table[1] + table[3]) * (table[0] + table[2]));
}
*/


// compute the frequency tables for each event(action).
function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let entry of journal) {
    let index = 0;
    if (entry.events.includes(event)) index++;
    if (entry.squirrel) index += 2;
    table[index]++;
  }
  return table;
}

//console.log(tableFor('pizza', JOURNAL));  

// build a list of all events(actions) as an array.
function journalEvents(journal) {
  let events = [];
    for (let entry of journal) {
      for (let event of entry.events) {
        if (!events.includes(event)) {
          events.push(event);
        }
      }
    }
    return events;
}

//console.log(journalEvents(JOURNAL));


// determine most significant predictors
for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.2 || correlation < -0.2) {
    //console.log(event + ":", correlation);
    }
}

/*Outputs :
brushed teeth: -0.38
spaghetti: 0.24
peanuts: 0.59
*/

// Check the compounding effect of predictor pairs, by creating dual predictors, ie spaghetti teeth, peanut teeth.
// spaghetti teeth outputs phi of 0.38, 
// peanut teeth follows below :
for (let entry of JOURNAL) {
  if (entry.events.includes('peanuts') && 
      !entry.events.includes('brushed teeth')) {
    entry.events.push('peanut teeth');
  }
}

//console.log(phi(tableFor("peanut teeth", JOURNAL)));
// → 1



/* Serializing Data

JavaScript gives us the functions 
JSON.stringify and 
JSON.parse 
to convert data to and from this format. 
The first takes a JavaScript value and returns a JSON-encoded string. 
The second takes such a string and converts it to the value it encodes.
*/

var corrs = [];

for (let event of journalEvents(JOURNAL)) {
  corrs.push({'event':event, 'correlation':phi(tableFor(event, JOURNAL))});
}

//console.log(corrs);

// serialize array into JSON
let eventCorr = JSON.stringify(corrs);
//console.log(eventCorr);

/* Outputs :
[{"event":"carrot","correlation":0.014},{"event":"exercise","correlation":0.069},...]
*/

console.log(JSON.parse(eventCorr)[0]);
// → { event: 'carrot', correlation: 0.014 }


// export serialized JSON object to text file

/*//Node.js:

var fs = require('fs');
fs.writeFile("eventCorrelations.txt", eventCorr, function(err) {
    if (err) {
        console.log(err);
    }
});
*/

/*
//Browser (webapi):

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
download(jsonData, 'json.txt', 'text/plain');
*/
