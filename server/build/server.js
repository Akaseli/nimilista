"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
var pg_1 = require("pg");
var app = (0, express_1.default)();
var port = process.env.PORT || 4000;
app.use(express_1.default.json());
var production = process.env.PRODUCTION === "true";
app.use(express_1.default.static("build"));
dotenv.config({ path: __dirname + '/.env' });
var localDatabaseUrl = "postgresql://".concat(process.env.USER, ":").concat(process.env.PASSWORD, "@").concat(process.env.HOST, ":").concat(process.env.DBPORT, "/").concat(process.env.DATABASE);
var pool = new pg_1.Pool({
    connectionString: production ? process.env.DATABASE_URL : localDatabaseUrl,
});
app.get("/people", function (req, res) {
    pool.query('SELECT * FROM people', function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
});
app.get("/people/:userId", function (req, res) {
    pool.query('SELECT * FROM people WHERE id = $1', [req.params.userId], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows[0]);
    });
});
app.post("/addPerson", function (req, res) {
    pool.query('INSERT INTO people(firstname, lastname, age) VALUES($1, $2, $3) RETURNING *', [req.body["firstName"], req.body["lastName"], req.body["age"]], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).send(results.rows[0]);
    });
});
app.delete("/delete/:userId", function (req, res) {
    pool.query('DELETE FROM people WHERE id = $1', [req.params.userId], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).send();
    });
});
app.put("/people/modify/:userId", function (req, res) {
    pool.query('UPDATE people SET firstname = $1, lastname = $2, age = $3 WHERE id = $4', [req.body["firstName"], req.body["lastName"], req.body["age"], req.params.userId], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).send();
    });
});
//app.get("*", (req, res) => {
//    res.sendFile(`${__dirname}/public/index.html`)
//});
app.listen(port, function () {
    console.log("Listening on ".concat(port));
});
