import { Empire } from "~/dto/Empire";
import { Route } from "../src/dto/Route";
import { Ship } from "../src/dto/Ship";
export const routesTest: Route[] = [
  { origin: "Dagobah", destination: "Endor", travel_time: 4 },
  { origin: "Dagobah", destination: "Hoth", travel_time: 1 },
  { origin: "Hoth", destination: "Endor", travel_time: 1 },
  { origin: "Tatooine", destination: "Dagobah", travel_time: 6 },
  { origin: "Tatooine", destination: "Hoth", travel_time: 6 },
];

export const shipTest: Ship = {
  autonomy: 6,
  departure: "Tatooine",
  arrival: "Endor",
  routes_db: "",
};

export const empire8: Empire = {
  countdown: 8,
  bounty_hunters: [
    { planet: "Hoth", day: 6 },
    { planet: "Hoth", day: 7 },
    { planet: "Hoth", day: 8 },
  ],
};

export const empire9: Empire = {
  countdown: 9,
  bounty_hunters: [
    { planet: "Hoth", day: 6 },
    { planet: "Hoth", day: 7 },
    { planet: "Hoth", day: 8 },
  ],
};

export const empire11: Empire = {
  countdown: 10,
  bounty_hunters: [
    { planet: "Hoth", day: 6 },
    { planet: "Hoth", day: 7 },
    { planet: "Hoth", day: 8 },
  ],
};

export const onePath = [
  [
    { destination: "Tatooine", travel_time: 0 },
    { destination: "Hoth", travel_time: 6 },
    { destination: "Hoth", travel_time: 1 },
    { destination: "Endor", travel_time: 1 },
  ],
];

export const twoPath = [
  [
    { destination: "Tatooine", travel_time: 0 },
    { destination: "Hoth", travel_time: 6 },
    { destination: "Hoth", travel_time: 1 },
    { destination: "Endor", travel_time: 1 },
  ],
  [
    { destination: "Tatooine", travel_time: 0 },
    { destination: "Dagobah", travel_time: 6 },
    { destination: "Dagobah", travel_time: 1 },
    { destination: "Hoth", travel_time: 1 },
    { destination: "Endor", travel_time: 1 },
  ],
];
export const threePath = [
  [
    { destination: "Tatooine", travel_time: 0 },
    { destination: "Dagobah", travel_time: 6 },
    { destination: "Dagobah", travel_time: 1 },
    { destination: "Endor", travel_time: 4 },
    { destination: "Endor", travel_time: 1 },
  ],
  [
    { destination: "Tatooine", travel_time: 0 },
    { destination: "Hoth", travel_time: 6 },
    { destination: "Hoth", travel_time: 1 },
    { destination: "Endor", travel_time: 1 },
  ],
  [
    { destination: "Tatooine", travel_time: 0 },
    { destination: "Dagobah", travel_time: 6 },
    { destination: "Dagobah", travel_time: 1 },
    { destination: "Hoth", travel_time: 1 },
    { destination: "Endor", travel_time: 1 },
  ],
];
