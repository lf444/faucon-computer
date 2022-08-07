import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import falcon from "./millennium-falcon.json";

// you would have to import / invoke this in another file
export async function openDb() {
  const db_name = path.join(__dirname, "", falcon.routes_db);
  return open({
    filename: db_name,
    driver: sqlite3.Database,
  });
}
