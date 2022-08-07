import cors from "cors";
import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import falcon from "./millennium-falcon.json";

// this is a top-level await
(async () => {
  // open the database
  const db_name = path.join(__dirname, "", falcon.routes_db);

  const db = await open({
    filename: db_name,
    driver: sqlite3.Database,
  });
  const result = await db.all("SELECT * FROM routes order by origin");
  console.log(result);
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
