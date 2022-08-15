import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { Ship } from "./dto/Ship";

// you would have to import / invoke this in another file
export async function openDb(falcon: Ship) {
  const db_name = path.join(__dirname, "", falcon.routes_db);
  return open({
    filename: db_name,
    driver: sqlite3.Database,
  });
}
