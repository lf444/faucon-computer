import { Empire } from "./dto/Empire";
import { Route } from "./dto/Route";
import { Ship } from "./dto/Ship";

export const computeChanceOfarrival = (
  routes: Route[],
  bounty_hunter: Empire,
  ship: Ship
): any[][] => {
  const currentRoutes = routes;
  return findAllPathFromStarToTheEnd(
    currentRoutes,
    ship.departure,
    ship.arrival,
    bounty_hunter.countdown
  );
};
interface Edge {
  [origin: string]: Array<{ destination: string; travel_time: number }>;
}

// find all planet from origin and destination in current routes
const findAllUniqueOriginAndDestination = (currentRoutes: Route[]) => {
  const uniqueOrigin = currentRoutes.map((r) => r.origin);
  const uniqueDestination = currentRoutes.map((r) => r.destination);
  return [...new Set(uniqueOrigin.concat(uniqueDestination))];
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
function isNotVisited(x: string, path: string[]) {
  for (let i = 0; i < path.length; i++) {
    if (path[i] === x) return false;
  }
  return true;
}

const testDfs = (
  start: string,
  end: string,
  adj: Array<Edge>
): Array<any[]> => {
  // Create a queue which stores
  // the paths
  let tempArray = [];
  let queue: Array<any[]> = [];

  // Path vector to store the current path
  let path: any[] = [];

  path.push(start);
  queue.push(path);

  while (queue.length !== 0) {
    path = queue[0];
    queue.shift();
    let last = path[path.length - 1];
    // If last vertex is the desired destination
    // then print the path
    if (last.destination ? last.destination === end : last === end) {
      tempArray.push(path);
    }

    const indexOfPlanet = adj.findIndex((e) =>
      last.destination
        ? last.destination === Object.keys(e)[0]
        : last === Object.keys(e)[0]
    );

    // Traverse to all the nodes connected to
    // current vertex and push new path to queue
    const lastNode: any[] =
      indexOfPlanet === -1
        ? []
        : Object.values(adj[indexOfPlanet])[0].map((e) => e);
    for (let i = 0; i < lastNode.length; i++) {
      if (isNotVisited(lastNode[i], path)) {
        let newpath: number[] = Array.from(path);
        newpath.push(lastNode[i]);
        queue.push(newpath);
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
  limit: number
): any[][] => {
  const vertices = findAllUniqueOriginAndDestination(currentRoutes);
  const adjList: Array<Edge> = [];
  for (const route of currentRoutes) {
    addEdgePlanet(route.origin, route.destination, route.travel_time, adjList);
  }

  return testDfs(start, end, adjList);
};
