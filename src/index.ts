import cors from "cors";
import express from "express";
import { Route } from "./dto/Route";
import { computeChanceOfarrival } from "./compute";
import { BountyHunter, Empire } from "./dto/Empire";
import falcon from "./millennium-falcon.json";
import { openDb } from "./db";

// this is a top-level await
(async () => {
  // open the database
  const connection = await openDb();
  const routes: Route[] = await connection.all(
    "SELECT * FROM routes order by origin"
  );
  const bountyHunter: BountyHunter = { planet: "hoth", day: 6 };
  const empire: Empire = {
    countdown: 7,
    bounty_hunter: [bountyHunter],
  };
  const t = computeChanceOfarrival(routes, empire, falcon);
  console.log(t);
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
