import { Route } from "./dto/Route";

export const jsMagic = () => {
  let v: number;

  let adjList: any[];

  // A directed graph using
  // adjacency list representation
  function Graph(vertices: number) {
    // initialise vertex count
    v = vertices;

    // initialise adjacency list
    initAdjList();
  }

  // utility method to initialise
  // adjacency list
  function initAdjList() {
    adjList = new Array(v);

    for (let i = 0; i < v; i++) {
      adjList[i] = [];
    }
  }

  // add edge from u to v
  function addEdge(u: number, v: any) {
    // Add v to u's list.
    adjList[u].push(v);
  }

  // Prints all paths from
  // 's' to 'd'
  function printAllPaths(s: number, d: number) {
    let isVisited = new Array(v);
    for (let i = 0; i < v; i++) isVisited[i] = false;
    let pathList = [];

    // add source to path[]
    pathList.push(s);

    // Call recursive utility
    printAllPathsUtil(s, d, isVisited, pathList);
  }

  // A recursive function to print
  // all paths from 'u' to 'd'.
  // isVisited[] keeps track of
  // vertices in current path.
  // localPathList<> stores actual
  // vertices in the current path
  function printAllPathsUtil(
    u: number,
    d: any,
    isVisited: any[],
    localPathList: any[]
  ) {
    if (u == d) {
      console.log(localPathList);
      // if match found then no need to
      // traverse more till depth
      return;
    }

    // Mark the current node
    isVisited[u] = true;

    // Recur for all the vertices
    // adjacent to current vertex
    for (let i = 0; i < adjList[u].length; i++) {
      if (!isVisited[adjList[u][i]]) {
        // store current node
        // in path[]
        localPathList.push(adjList[u][i]);
        printAllPathsUtil(adjList[u][i], d, isVisited, localPathList);

        // remove current node
        // in path[]
        localPathList.splice(localPathList.indexOf(adjList[u][i]), 1);
      }
    }

    // Mark the current node
    isVisited[u] = false;
  }

  Graph(4);
  addEdge(0, 1);
  addEdge(0, 2);
  addEdge(1, 2);
  addEdge(1, 3);
  addEdge(2, 3);

  // arbitrary source
  let s = 0;

  // arbitrary destination
  let d = 3;
  printAllPaths(s, d);
};

export const DFS = () => {
  let v: number;

  let adjList: Array<number[]> = [];

  // A directed graph using
  // adjacency list representation
  function Graph(vertices: number) {
    // initialise vertex count
    v = vertices;

    // initialise adjacency list
    initAdjList();
  }

  // utility method to initialise
  // adjacency list
  function initAdjList() {
    adjList = new Array(v);

    for (let i = 0; i < v; i++) {
      adjList[i] = [];
    }
  }

  // add edge from u to v
  function addEdge(u: number, v: any) {
    // Add v to u's list.
    adjList[u].push(v);
  }

  function isNotVisited(x: number, path: number[]) {
    for (let i = 0; i < path.length; i++) {
      if (path[i] === x) return false;
    }
    return true;
  }

  const dfs = (s: number, d: number, adj: Array<number[]>): Array<number[]> => {
    let tempArray: Array<number[]> = [];

    // Create a queue which stores
    // the paths
    let queue: Array<number[]> = [];

    // Path vector to store the current path
    let path: number[] = [];

    path.push(s);
    queue.push(path);

    while (queue.length !== 0) {
      path = queue[0];
      queue.shift();
      let last = path[path.length - 1];

      // If last vertex is the desired destination
      // then print the path
      if (last === d) {
        tempArray.push(path);
      }

      // Traverse to all the nodes connected to
      // current vertex and push new path to queue
      for (let i = 0; i < adj[last].length; i++) {
        if (isNotVisited(adj[last][i], path)) {
          let newpath: number[] = Array.from(path);
          newpath.push(adj[last][i]);
          queue.push(newpath);
        }
      }
    }
    return tempArray;
  };

  Graph(4);
  addEdge(0, 1);
  addEdge(0, 2);
  addEdge(1, 2);
  addEdge(1, 3);
  addEdge(2, 3);

  // arbitrary source
  let s = 0;

  // arbitrary destination
  let d = 3;

  const t = dfs(s, d, adjList);
};

// JavaScript program to print all
// paths from a source to
// destination.

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
): [] => {
  const vertices = findAllUniqueOriginAndDestination(currentRoutes);
  const adjList: Array<Edge> = [];
  for (const route of currentRoutes) {
    addEdgePlanet(route.origin, route.destination, route.travel_time, adjList);
  }
  const t = testDfs(start, end, adjList);
  console.log(t);
  return [];
};

// Prints all paths from
// 's' to 'd'
interface Visite {
  planet: string;
  isVisited: boolean;
}