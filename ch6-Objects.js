// class Constructors

class Rabbit {
  constructor(type='fluffy', speed=2) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");


/*
Class declarations only allow methods—properties that hold functions—to be added to the prototype. 
You can still create such properties by directly manipulating the prototype after you’ve defined the class.
*/

// Setting default class properties - Overriding derived properties
/*
// set class property
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// → small

// override class property
killerRabbit.teeth = "long, sharp, and bloody";

console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log(blackRabbit.teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small
*/

// Objects as maps
/*
it is possible to create objects with no prototype. 
If you pass null to Object.create , 
the resulting object will not derive from Object.prototype, 
and can safely be used as a map.

//console.log("toString" in Object.create(null));
// → false
*/

// Maps
/*
JavaScript comes with a class called Map. 
It stores a mapping, and allows any type of keys, not just strings.
The methods set , get , and has are part of the interface of the Map object.
*/
/*
let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);
*/
/*
As an alternative to the in operator, you can use the hasOwnProperty method, 
which ignores the object’s prototype.

console.log({x: 1}.hasOwnProperty("x"));
// → true
console.log({x: 1}.hasOwnProperty("toString"));
// → false
*/
/*
rabbit = new Rabbit('fluff');
console.log(rabbit.keys);
*/

// Symbols
/*
// Unlike strings, newly created symbols are unique.
// Useable as property names

let sym = Symbol("sym");
Rabbit.prototype[sym] = 55;

console.log(blackRabbit[sym]);
// → 55

// It is possible to include symbol properties in object expressions and classes by using square brackets around the property name.

let stringObject = {
[toStringSymbol]() { return "a jute rope"; }
};

console.log(stringObject[toStringSymbol]());
// → a jute rope
*/

// Symbol Iterator
/*
let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}
*/

// instanceof
/*
console.log([1] instanceof Array);
// → true
*/

// Get, set, and static

/*
methods that have static written before their name are stored on the constructor.
Static methods won’t have access to a class instance, but can for example be used to provide additional ways to create
instances.
*/
/*
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }
  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// → 30
*/

// Inheritance
/*
class Child extends Parent {
  constructor(...parentArgs, ...childArgs) {
    // calls the Parent's Constructor
    super(...parentArgs);
    // child arguments
    for (let arg of childArgs) {
      let this.arg = arg;
    }
  }

}
*/
