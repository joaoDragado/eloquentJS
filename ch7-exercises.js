/*
// more efficient route planing

function smarterCourier({location, parcels}, route) {
  if (route.length == 0) {
    // Describe a route for every parcel
    let routes = parcels.map(parcel => {
      if (parcel.location != location) {
        return {route: shortestRoute(roadGraph, location, parcel.location),
                pickUp: true};
      } else {
        return {route: shortestRoute(roadGraph, location, parcel.address),
                pickUp: false};
      }
    });

    // This determines the precedence a route gets when choosing.
    // Route length counts negatively, routes that pick up a package
    // get a small bonus.
    function score({route, pickUp}) {
      return (pickUp ? 0.5 : 0) - route.length;
    }
    route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
  }

  return {direction: route[0], memory: route.slice(1)};
}

console.log(courierRun(Itinerary.random(), smarterCourier, []));
*/


/*
// persistant storage Set-like Object

class PGroup {
  constructor(members) {
    this.members = members;
  }

  add(value) {
    if (this.has(value)) return this;
    return new PGroup(this.members.concat([value]));
  }

  delete(value) {
    if (!this.has(value)) return this;
    return new PGroup(this.members.filter(m => m !== value));
  }

  has(value) {
    return this.members.includes(value);
  }
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false

*/
