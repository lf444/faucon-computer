import { Empire } from "./dto/Empire";
import { Route } from "./dto/Route";
import { Ship } from "./dto/Ship";

interface Edge {
  [origin: string]: Array<{ destination: string; travel_time: number }>;
}

export const computeChanceOfarrival = (
  routes: Route[],
  empire: Empire,
  ship: Ship
): any[][] => {
  const currentRoutes = routes;
  return findAllPathFromStarToTheEnd(
    currentRoutes,
    ship.departure,
    ship.arrival,
    ship.autonomy
  );
};

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

const findAllpaths = (
  start: string,
  end: string,
  adj: Array<Edge>,
  shipAutonomy: number,
  countDown: number
): Array<any[]> => {
  // Create a queue which stores
  // the paths
  let tempArray = [];
  let queue: Array<any[]> = [];

  // Path vector to store the current path
  let path: { destination: string; travel_time: number }[] = [];

  path.push({ destination: start, travel_time: 0 });
  queue.push(path);

  while (queue.length !== 0) {
    path = queue[0];
    queue.shift();
    let last = path[path.length - 1];
    // If last vertex is the desired destination
    // then print the path
    if (last.destination === end) {
      console.log(path);
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
          let newpath: any[] = Array.from(path);
          newpath.push(lastNode[i]);
          queue.push(newpath);
        }
      }
    }
  }
  return tempArray;
};

// Find all avaible route from all routes from start to end
export const findAllPathFromStarToTheEnd = (
  currentRoutes: Route[],
  start: string,
  end: string,
  shipAutonomy: number
): any[][] => {
  const adjList: Array<Edge> = [];
  for (const route of currentRoutes) {
    addEdgePlanet(route.origin, route.destination, route.travel_time, adjList);
  }

  return findAllpaths(start, end, adjList, shipAutonomy, 11);
};
