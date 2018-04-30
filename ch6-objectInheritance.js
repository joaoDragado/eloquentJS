class Person {
  constructor(first, last, age, gender, interests) {

    this.name = {
      'first': first,
      'last' : last
    };
    this.fullName = this.name.first + ' ' + this.name.last;
    this.age = age;
    this.gender = gender;
    this.interests = interests;
  }
  
  bio() {
    return (this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old, and likes ' + this.interests.toString() + '.');
  };

  greeting() {
    return ('Hi! I\'m ' + this.name.first + '.');
  };
}

Person.prototype.farewell = function() {
  return (this.name.first + ' has left the building. Bye for now!');
};

/*
let person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
console.log(person1.farewell());
*/
//console.log(['aw', 'oh', 'eeh'].toString();
 
class Teacher extends Person {
  
  constructor(first, last, age, gender, interests, subject) {
    super(first, last, age, gender, interests);
    this.subject = subject;
  };
}

let teacher1 = new Teacher('Bob', 'Smith', 32, 'male', ['music', 'skiing'], 'Math');

console.log(teacher1.farewell());
