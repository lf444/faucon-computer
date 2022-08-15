import { chancesOfArrival } from "~/compute";
import { BountyHunter, Empire } from "~/dto/Empire";
import { Destination } from "./path";

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

// Regarder si les jour suivant y'a des pirates
export const getProbabilitiesOfArrival = (
  pathFinded: Array<Destination[]>,
  empire: Empire
): chancesOfArrival[] => {
  const probabilities: Array<chancesOfArrival> = [];

  for (const path of pathFinded) {
    let currentDay = 0;
    const initialValue = 0;
    const dayAvailableByPath =
      empire.countdown -
      path.reduce(
        (accumulator, currentDestination) =>
          accumulator + currentDestination.travel_time,
        initialValue
      );
    const bounty_hunter: BountyHunter[] = [];
    let dayToWaitByPlanet = [];

    for (const p of path) {
      currentDay += p.travel_time;
      if (dayAvailableByPath > 0) {
        for (let i = 0; i <= dayAvailableByPath; i++) {
          const test = empire.bounty_hunters.find(
            (bh) => bh.planet === p.destination && bh.day === currentDay + i
          );
          if (!test) {
            dayToWaitByPlanet.push({
              destination: p.destination,
              arrivalShouldbeOnday:
                currentDay !== currentDay + i ? currentDay + i : 0,
            });
            break;
          }
        }
      }

      const test = empire.bounty_hunters.filter(
        (bh) => bh.planet === p.destination && bh.day === currentDay
      );
      bounty_hunter.push(...test);
    }
    dayToWaitByPlanet = dayToWaitByPlanet.filter(
      (bh) => bh.arrivalShouldbeOnday !== 0
    );

    let traveled_time = 0;
    for (const ph of path) {
      traveled_time += ph.travel_time;
      for (const d of dayToWaitByPlanet) {
        if (d.destination === ph.destination) {
          if (d.arrivalShouldbeOnday > traveled_time) {
            traveled_time += d.arrivalShouldbeOnday - traveled_time;
            ph.travel_time += d.arrivalShouldbeOnday - traveled_time;
          }
        }
      }
    }

    if (dayToWaitByPlanet.length > 0 && traveled_time <= empire.countdown) {
      probabilities.push({
        path,
        percentOfSuccess: computeProbabilities(0),
        instrucitonToAvoidPirate: dayToWaitByPlanet,
      });
    } else {
      probabilities.push({
        path,
        percentOfSuccess: computeProbabilities(bounty_hunter.length),
      });
    }
  }
  return probabilities;
};
