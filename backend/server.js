require("dotenv").config({ path: __dirname + "/.env" });

console.log("Usuario DB:", process.env.DB_USER);
console.log("Base de datos:", process.env.DB_NAME);

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Ruta para obtener los carros
app.get("/cars", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cars");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
