import { Empire } from "./dto/Empire";
import { Route } from "./dto/Route";
import { Ship } from "./dto/Ship";
import { DFS, findAllPathFromStarToTheEnd, jsMagic } from "./test";

export const computeChanceOfarrival = (
  routes: Route[],
  bounty_hunter: Empire,
  ship: Ship
): void => {
  const currentRoutes = routes;
  /*   console.log(currentRoutes);
  console.log("\n---------------------------\n"); */
  /*   findAllAvailableRoute(
    currentRoutes,
    ship.departure,
    ship.arrival,
    bounty_hunter.countdown
  ); */ /*  */
  findAllPathFromStarToTheEnd(
    currentRoutes,
    ship.departure,
    ship.arrival,
    bounty_hunter.countdown
  );
};

// find all planet from origin and destination in current routes
const findAllUniqueOriginAndDestination = (currentRoutes: Route[]) => {
  const uniqueOrigin = currentRoutes.map((r) => r.origin);
  const uniqueDestination = currentRoutes.map((r) => r.destination);
  return [...new Set(uniqueOrigin.concat(uniqueDestination))];
};

interface Edge {
  [origin: string]: Array<{ destination: string; travel_time: number }>;
}

// Find all avaible route from all routes from start to end
const findAllAvailableRoute = (
  currentRoutes: Route[],
  start: string,
  end: string,
  limit: number
): [] => {
  const vertices = findAllUniqueOriginAndDestination(currentRoutes);
  const adjList: Array<Edge> = [];
  for (const route of currentRoutes) {
    addEdgePlanet(route.origin, route.destination, route.travel_time, adjList);
  }
  /*  console.log(adjList); */
  printAllPaths(start, end, vertices, adjList);
  return [];
};

// JavaScript program to print all
// paths from a source to
// destination.

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

// Prints all paths from
// 's' to 'd'
interface Visite {
  planet: string;
  isVisited: boolean;
}
function printAllPaths(
  start: string,
  end: string,
  vertices: string[],
  adjList: Array<Edge>
) {
  let isVisited: Array<Visite> = [];
  for (let i = 0; i < vertices.length; i++) {
    isVisited[i] = { planet: vertices[i], isVisited: false };
  }
  let pathList: any = [];
  // add source to path[]
  pathList.push(start);
  // Call recursive utility
  const t = printAllPathsUtil(start, end, isVisited, pathList, adjList);
}

// A recursive function to print
// all paths from 'u' to 'd'.
// isVisited[] keeps track of
// vertices in current path.
// localPathList<> stores actual
// vertices in the current path
function printAllPathsUtil(
  u: string,
  d: string,
  isVisited: Array<Visite>,
  localPathList: any[],
  adjList: Array<Edge>
) {
  if (u === d) {
    // if match found then no need to
    // traverse more till depth
    console.log(localPathList);
    return;
  } else {
    // Mark the current node
    isVisited = isVisited.map((visite) =>
      visite.planet === u ? { ...visite, isVisited: true } : visite
    );
    // Recur for all the vertices
    // adjacent to current vertex
    const indexOfPlanet = adjList.findIndex((e) => Object.keys(e)[0] === u);
    for (let i = 0; i < Object.values(adjList[indexOfPlanet])[0].length; i++) {
      const isvitedPlanet = isVisited.find(
        (v) =>
          v.planet === Object.values(adjList[indexOfPlanet])[0][i].destination
      );

      if (!isvitedPlanet!.isVisited) {
        // store current node
        // in path[]
        localPathList.push(Object.values(adjList[indexOfPlanet])[0][i]);

        printAllPathsUtil(
          Object.values(adjList[indexOfPlanet])[0][i].destination,
          d,
          isVisited,
          localPathList,
          adjList
        );

        // remove current node
        // in path[]
        localPathList.splice(
          localPathList.indexOf(Object.values(adjList[indexOfPlanet])[0][i]),
          1
        );
      }
    }
    // Mark the current node
    isVisited = isVisited.map((visite) =>
      visite.planet === u ? { ...visite, isVisited: false } : visite
    );
  }
}

/* jsMagic(); */
/* DFS(); */
