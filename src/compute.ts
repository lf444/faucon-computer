import { Empire } from "./dto/Empire";
import { Route } from "./dto/Route";
import { Ship } from "./dto/Ship";

interface Edge {
  [origin: string]: Array<{ destination: string; travel_time: number }>;
}

// add edge from origin to destination
function addEdgePlanet(
  origin: string,
  destination: string,
  travel_time: number,
  adjList: Array<Edge>
) {
  const newEdge: Edge = {
    [origin]: [{ destination: destination, travel_time: travel_time }],
  };

  const isMyUexist = adjList.findIndex((e) => Object.keys(e)[0] === origin);
  if (isMyUexist === -1) {
    adjList.push(newEdge);
  } else {
    Object.values(adjList[isMyUexist])[0].push({
      destination: destination,
      travel_time: travel_time,
    });
  }
}

function isNotVisited(
  x: string,
  path: { destination: string; travel_time: number }[]
) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].destination === x) return false;
  }
  return true;
}

const checkIfThereIsEnoughTime = (
  timeLimit: number,
  path: { destination: string; travel_time: number }[],
  currentNodeTravelTime: { destination: string; travel_time: number },
  shipAutonomy: number
): boolean => {
  let autonomy = shipAutonomy;
  let initalValue = 0;
  const tempArray = [...path, currentNodeTravelTime];
  for (const p of tempArray) {
    // Check if distance can be done then get fuel & reset ship autonomy
    if (autonomy < p.travel_time) {
      autonomy = shipAutonomy;
      initalValue++;
    } else {
      autonomy -= p.travel_time;
    }
    initalValue += p.travel_time;
  }

  return initalValue <= timeLimit;
};

interface Destination {
  destination: string;
  travel_time: number;
}
const findAllpaths = (
  start: string,
  end: string,
  adj: Array<Edge>,
  shipAutonomy: number,
  countDown: number
): Array<Destination[]> => {
  // Create a queue which stores
  // the paths
  let tempArray = [];
  let queue: Array<any[]> = [];

  // Path vector to store the current path
  let path: Destination[] = [];

  path.push({ destination: start, travel_time: 0 });
  queue.push(path);

  while (queue.length !== 0) {
    path = queue[0];
    queue.shift();
    let last = path[path.length - 1];
    // If last vertex is the desired destination
    // then print the path
    if (last.destination === end) {
      tempArray.push(path);
    }

    const indexOfPlanet = adj.findIndex(
      (e) => last.destination === Object.keys(e)[0]
    );

    // Traverse to all the nodes connected to
    // current vertex and push new path to queue
    const lastNode: any[] =
      indexOfPlanet === -1
        ? []
        : Object.values(adj[indexOfPlanet])[0].map((e) => e);
    for (let i = 0; i < lastNode.length; i++) {
      if (
        isNotVisited(lastNode[i], path) &&
        lastNode[i].travel_time <= shipAutonomy
      ) {
        if (
          checkIfThereIsEnoughTime(countDown, path, lastNode[i], shipAutonomy)
        ) {
          let newpath: Destination[] = Array.from(path);
          newpath.push(lastNode[i]);
          queue.push(newpath);
        }
      }
    }
  }
  return tempArray;
};

// Find all avaible route from all routes from start to end
const findAllPathFromStarToTheEnd = (
  currentRoutes: Route[],
  start: string,
  end: string,
  shipAutonomy: number,
  timeLimit: number
): Array<Destination[]> => {
  const adjList: Array<Edge> = [];
  for (const route of currentRoutes) {
    addEdgePlanet(route.origin, route.destination, route.travel_time, adjList);
  }

  return findAllpaths(start, end, adjList, shipAutonomy, timeLimit);
};
const computeProbabilities = (nbOfBountyHunterByPlanet: number): number => {
  if (0) {
    return 100;
  }
  let initalvalue = 0;
  for (let i = 0; i < nbOfBountyHunterByPlanet; i++) {
    initalvalue += Math.pow(9, i) / Math.pow(10, i + 1);
  }
  const percentOfSuccess = 100 - initalvalue * 100;
  return percentOfSuccess <= 0 ? 0 : percentOfSuccess;
};
const getProbabilitiesOfArrival = (
  pathFinded: Array<Destination[]>,
  empire: Empire,
  shipAutonomy: number
): any[] => {
  const probabilities: Array<{
    path: Destination[];
    percentOfSuccess: number;
  }> = [];
  console.log(empire.bounty_hunter);
  console.log("\n");
  for (const path of pathFinded) {
    let currentDay = 0;
    let nbOfBountyHunterByPlanet = 0;
    let autonomy = shipAutonomy;
    const initialValue = 0;
    const dayAvailableByPath =
      10 -
      path.reduce(
        (accumulator, currentDestination) =>
          accumulator + currentDestination.travel_time,
        initialValue
      );
    console.log(path);
    // regarder si le sommet courant à des prirates ? puis tester si en on peut donner assez de jour pour les esquiver
    for (const p of path) {
      let nextP: Destination | undefined = path[path.indexOf(p) + 1];
      currentDay += p.travel_time;
      autonomy -= p.travel_time;
      let refill = false;

      if (nextP && nextP.travel_time > autonomy) {
        autonomy = shipAutonomy;
        refill = true;
      }

      for (const bh of empire.bounty_hunter) {
        if (p.destination === bh.planet) {
          if (currentDay === bh.day) {
            nbOfBountyHunterByPlanet++;
          }

          if (refill && currentDay + 1 === bh.day) {
            nbOfBountyHunterByPlanet++;
          }

          if (nbOfBountyHunterByPlanet > 0 && dayAvailableByPath > 0) {
            console.log("destination " + p.destination);
            for (let i = 0; i < dayAvailableByPath; i++) {}
          }
        }
      }
    }
    probabilities.push({
      path,
      percentOfSuccess: computeProbabilities(nbOfBountyHunterByPlanet),
    });
    console.log("\n");
  }
  console.log(probabilities);
  return probabilities;
};

export const computeChanceOfarrival = (
  routes: Route[],
  empire: Empire,
  ship: Ship
): any[][] => {
  const PathFinded = findAllPathFromStarToTheEnd(
    routes,
    ship.departure,
    ship.arrival,
    ship.autonomy,
    10
  );

  /*   console.log(PathFinded);
   */
  const probabilitiesSucces = getProbabilitiesOfArrival(
    PathFinded,
    empire,
    ship.autonomy
  );

  return probabilitiesSucces;
};
