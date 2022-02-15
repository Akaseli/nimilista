import express from "express";
import * as dotenv from "dotenv";
const app = express()
const port = 4000;

dotenv.config({ path: __dirname+'/.env' });

app.get("/", (req, res) => {
    res.send("Value " + process.env.TEST)
});

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})