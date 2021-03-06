import express, { response } from "express";
import * as dotenv from "dotenv";
import { Pool } from "pg";
const app = express()
const port = process.env.PORT || 4000;

app.use(express.json())

const production = process.env.PRODUCTION === "true";

app.use(express.static("build"))

dotenv.config({ path: __dirname+'/.env' });

const localDatabaseUrl =  `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DBPORT}/${process.env.DATABASE}`;

const pool = new Pool({
    connectionString: production ? process.env.DATABASE_URL : localDatabaseUrl,
    ssl: {
        rejectUnauthorized: false,
    },
})

app.get("/people", (req, res) => {
    pool.query('SELECT * FROM people', (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    });
});

app.get("/people/:userId", (req, res) => {
    pool.query('SELECT * FROM people WHERE id = $1', [req.params.userId], (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows[0]);
    });
});

app.post("/addPerson", (req, res) => {
    pool.query('INSERT INTO people(firstname, lastname, age) VALUES($1, $2, $3) RETURNING *', [req.body["firstName"], req.body["lastName"], req.body["age"]], (error, results) => {
        if (error){
            throw error;
        }
        res.status(200).send(results.rows[0]);
    });
});

app.delete("/delete/:userId", (req, res) => {
    pool.query('DELETE FROM people WHERE id = $1', [req.params.userId], (error, results) =>  {
        if(error){
            throw error;
        }
        res.status(200).send();
    });
})

app.put("/people/modify/:userId", (req, res) => {
    pool.query('UPDATE people SET firstname = $1, lastname = $2, age = $3 WHERE id = $4', [req.body["firstName"], req.body["lastName"], req.body["age"], req.params.userId], (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).send();
    });
});

//app.get("*", (req, res) => {
//    res.sendFile(`${__dirname}/public/index.html`)
//});

app.listen(port, () => {
    console.log(`Listening on ${port}, Production ${production}`)
})