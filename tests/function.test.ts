import { getProbabilitiesOfArrival } from "../src/function/probabilities";
import { findAllPathFromStarToTheEnd } from "../src/function/path";
import {
  empire11,
  empire8,
  empire9,
  onePath,
  routesTest,
  shipTest,
  threePath,
  twoPath,
} from "./data";

describe("Test path finding function", () => {
  it("Not enought time to have a path", () => {
    const PathFinded = findAllPathFromStarToTheEnd(
      routesTest,
      shipTest.departure,
      shipTest.arrival,
      shipTest.autonomy,
      7
    );
    expect(PathFinded).toEqual([]);
  });

  it("1 PATH FIND", () => {
    const PathFinded = findAllPathFromStarToTheEnd(
      routesTest,
      shipTest.departure,
      shipTest.arrival,
      shipTest.autonomy,
      8
    );
    expect(PathFinded).toEqual(onePath);
  });

  it("2 PATH FIND", () => {
    const PathFinded = findAllPathFromStarToTheEnd(
      routesTest,
      shipTest.departure,
      shipTest.arrival,
      shipTest.autonomy,
      9
    );

    expect(PathFinded).toEqual(twoPath);
  });

  it("3 PATH FIND", () => {
    const PathFinded = findAllPathFromStarToTheEnd(
      routesTest,
      shipTest.departure,
      shipTest.arrival,
      shipTest.autonomy,
      11
    );

    expect(PathFinded).toEqual(threePath);
  });
});

describe("Test prob function", () => {
  it("81 chance of succes one 8 days", () => {
    const probabilitiesSucces = getProbabilitiesOfArrival(onePath, empire8);

    expect(probabilitiesSucces).toEqual([
      {
        path: [
          { destination: "Tatooine", travel_time: 0 },
          { destination: "Hoth", travel_time: 6 },
          { destination: "Hoth", travel_time: 1 },
          { destination: "Endor", travel_time: 1 },
        ],
        percentOfSuccess: 81,
      },
    ]);
  });

  it("81 & 90 chance of succes on 9 days", () => {
    const probabilitiesSucces = getProbabilitiesOfArrival(twoPath, empire9);
    expect(probabilitiesSucces).toEqual([
      {
        path: [
          { destination: "Tatooine", travel_time: 0 },
          { destination: "Hoth", travel_time: 6 },
          { destination: "Hoth", travel_time: 1 },
          { destination: "Endor", travel_time: 1 },
        ],
        percentOfSuccess: 81,
      },
      {
        path: [
          { destination: "Tatooine", travel_time: 0 },
          { destination: "Dagobah", travel_time: 6 },
          { destination: "Dagobah", travel_time: 1 },
          { destination: "Hoth", travel_time: 1 },
          { destination: "Endor", travel_time: 1 },
        ],
        percentOfSuccess: 90,
      },
    ]);
  });

  it("81 & 100 chance of succes on 10 day", () => {
    const probabilitiesSucces = getProbabilitiesOfArrival(twoPath, empire11);
    expect(probabilitiesSucces).toEqual([
      {
        path: [
          { destination: "Tatooine", travel_time: 0 },
          { destination: "Hoth", travel_time: 6 },
          { destination: "Hoth", travel_time: 1 },
          { destination: "Endor", travel_time: 1 },
        ],
        percentOfSuccess: 81,
      },
      {
        path: [
          { destination: "Tatooine", travel_time: 0 },
          { destination: "Dagobah", travel_time: 6 },
          { destination: "Dagobah", travel_time: 1 },
          { destination: "Hoth", travel_time: 1 },
          { destination: "Endor", travel_time: 1 },
        ],
        percentOfSuccess: 100,
        instrucitonToAvoidPirate: [
          {
            arrivalShouldbeOnday: 9,
            destination: "Hoth",
          },
        ],
      },
    ]);
  });
});
