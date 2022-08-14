import cors from "cors";
import express from "express";
import { Route } from "./dto/Route";
import { computeChanceOfarrival } from "./compute";
import { BountyHunter, Empire } from "./dto/Empire";
import falcon from "./millennium-falcon.json";
import { openDb } from "./db";
const port = 8080;
// this is a top-level await
(async () => {
  // open the database
  const connection = await openDb();
  const routes: Route[] = await connection.all(
    "SELECT * FROM routes order by origin"
  );
  const empire: Empire = {
    countdown: 7,
    bounty_hunters: [
      { planet: "Hoth", day: 6 },
      { planet: "Hoth", day: 7 },
      { planet: "Hoth", day: 8 },
    ],
  };

  const t = computeChanceOfarrival(routes, empire, falcon);
})();

/**
 * On créé une nouvelle "application" express
 */
const app = express();

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json());

/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */
app.use(cors());

/**
 * Homepage (uniquement necessaire pour cette demo)
 */
app.get("/", (req, res) => res.send("🏠"));

function instanceOfA(object: any): object is Empire {
  return (
    object.hasOwnProperty("countdown") &&
    object.hasOwnProperty("bounty_hunters")
  );
}
app.post("/computeChanceOfarrival", async (req, res) => {
  // open the database
  if (req.body && instanceOfA(req.body)) {
    const connection = await openDb();
    const routes: Route[] = await connection.all(
      "SELECT * FROM routes order by origin"
    );
    const chanceOfArrival = computeChanceOfarrival(routes, req.body, falcon);
    res.status(200).send(chanceOfArrival);
  } else {
    res.status(403).send("WRONG DATA !");
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
