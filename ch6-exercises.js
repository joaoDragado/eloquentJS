//Iterable Group within Class Function

/*
class Group {
  constructor() {
    this.data = [];
  }
  add(value) {
    if (!this.has(value)) {
      this.data.push(value);
    }
  }
  delete(value) {
    if (this.has(value)) {
      this.data.splice(this.data.indexOf(value),1);
    }
  }
  has(value) {
    return this.data.includes(value);
  }
  static from(iter) {
    let obj = new Group();
    for (let val of iter) {
      obj.add(val);
    }
    return obj;
  }
  
  [Symbol.iterator]() {
    var index = -1;
    var data  = this.data;

    return {
      next: () => ({ value: data[++index], done: !(index in data) })
    }
  }
}

*/

/*
let test = Group.from([2,4,6]);

for (let i of test) {
  console.log(i);
}

*/


//Iterable Group with helper iterator Class

/*
class Group {
  constructor() {
    this.data = [];
  }
  add(value) {
    if (!this.has(value)) {
      this.data.push(value);
    }
  }
  delete(value) {
    if (this.has(value)) {
      this.data.splice(this.data.indexOf(value),1);
    }
  }
  has(value) {
    return this.data.includes(value);
  }
  static from(iter) {
    let obj = new Group();
    for (let val of iter) {
      obj.add(val);
    }
    return obj;
  }
  
  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}


class GroupIterator {
  constructor(group) {
    this.group = group;
    this.position = 0;
  }

  next() {
    if (this.position >= this.group.members.length) {
      return {done: true};
    } else {
      let result = {value: this.group.members[this.position],
                    done: false};
      this.position++;
      return result;
    }
  }
}

*/

/*
let test = Group.from([2,4,6]);

for (let i of test) {
  console.log(i);
}
*/

//Iterable Group with generator

/*
class Group {
  constructor() {
    this.data = [];
  }
  add(value) {
    if (!this.has(value)) {
      this.data.push(value);
    }
  }
  delete(value) {
    if (this.has(value)) {
      this.data.splice(this.data.indexOf(value),1);
    }
  }
  has(value) {
    return this.data.includes(value);
  }
  static from(iter) {
    let obj = new Group();
    for (let val of iter) {
      obj.add(val);
    }
    return obj;
  }
  
  *[Symbol.iterator]() {
    for (let val of this.data) {
      yield val;
    }
  }
}

*/

/*
let test = Group.from([2,4,6]);

for (let i of test) {
  console.log(i);
}

*/
