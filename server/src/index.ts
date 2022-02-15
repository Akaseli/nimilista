import express from 'express';
import { Pool } from 'pg';
const app = express();
const port = 4000;

//const db = new Pool();



app.get('/', (req, res) => {
    res.send({online: true})
});

app.get('/people', (req, res) => {
    res.send({online: true})
});

app.listen(port, () => {
    return console.log(`Listening on ${port}`)
});