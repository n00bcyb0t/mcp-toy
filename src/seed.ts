import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("toy.db");

db.exec(`
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS secrets;

  CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, role TEXT);
  INSERT INTO users (username, role) VALUES ('alice', 'user'), ('bob', 'admin');

  CREATE TABLE secrets (id INTEGER PRIMARY KEY, name TEXT, value TEXT);
  INSERT INTO secrets (name, value) VALUES ('api_key', 'sk-live-DEADBEEF-do-not-leak');
`);

console.error("seeded toy.db");
db.close();