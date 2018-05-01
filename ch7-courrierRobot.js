
// the village of Meadowfield
const roads = [
"Alice's House-Bob's House", "Alice's House-Cabin",
"Alice's House-Post Office", "Bob's House-Town Hall",
"Daria's House-Ernie's House", "Daria's House-Town Hall",
"Ernie's House-Grete's House", "Grete's House-Farm",
"Grete's House-Shop", "Marketplace-Farm",
"Marketplace-Post Office", "Marketplace-Shop",
"Marketplace-Town Hall", "Shop-Town Hall"
];

// convert the list of roads to a Map that gives information about the graph ; 11 nodes, 14 edges.

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split('-'))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

//console.log(roadGraph);

class Itinerary {
  // courrier has its current location & its undelivered parcels
  constructor(location, parcels) {
    this.location = location;
    this.parcels = parcels;
  }
  
  // Check if it can go to destination ; if not stay put.
  // Otherwise, remove all parcels that get delivered to our new location, and update the location of the reamining parcels.
  
  move(destination) {
    if (!roadGraph[this.location].includes(destination)) {
      return this;
    } else {
        let parcels = this.parcels.map(p => {
        if (p.location != this.location) return p;
        return {location: destination, address: p.address};
        }).filter(p => p.location != p.address);
        return new Itinerary(destination, parcels);
    }
  }
}

/*
main function ; turn-based (aka stepwise). 
args :the courrier, 
      the itinerary (present location + parcels),
      memory of path covered.
Each step updates the itinerary/memory, & moves to new path point(location).      
function exits when there are 0 parcels for delivery.
*/
function courrierRun(itinerary, courrier, memory) {
  for (let turn = 0;; turn++) {
    if (itinerary.parcels.length == 0) {
      /*console.log(`Done in ${turn} turns`);
      break;*/
      return turn;
  }
  let step = courrier(itinerary, memory);
  itinerary = itinerary.move(step.newLocation);
  memory = step.memory;
  //console.log(`Moved to ${step.newLocation}`);
  }
}

// chooses a random node in the roadGraph.
function randomLocation(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

// this courier picks its new location to visit next at random
function randomCourier(itinerary) {
  return {newLocation: randomLocation(roadGraph[itinerary.location])};
}

// static method that builds an initial Itinerary & sets the Post Office as starting location .
Itinerary.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomLocation(Object.keys(roadGraph));
    let location;
  do {
    location = randomLocation(Object.keys(roadGraph));
  } while (location == address);
  parcels.push({location, address});
  }
  return new Itinerary("Post Office", parcels);
};

// Test Run
//courrierRun(Itinerary.random(), randomCourier);
//console.log(courrierRun(Itinerary.random(), randomCourier));

/*
// frequency analysis of 1000 simulation runs
let duration = 1000; 
let runs = [];
for (var i = 0; i < duration; i++) {
  runs.push(courrierRun(Itinerary.random(), randomCourier));
}

let simMean = Math.floor(runs.reduce((acc, curr) => acc + curr) / runs.length);
console.log(`No of Simulations : ${runs.length}
Mean Simulation Run : ${simMean}`);
// -> No of Simulations : 1000
// -> Mean Simulation Run : 69
*/
