const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const knex = require('knex');

const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const entires = require("./controllers/entries");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const saltRounds = 10;

const database = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'sachin255',
      database : 'smart_brain'
    }
});

app.get("/", (req, res) => {
    res.status(200).send(database.users);
});

app.post("/signin", (req, res) => { signIn.signIn(req, res, database, bcrypt) });

app.post("/register", (req, res) => { register.handleRegister(req, res, database, bcrypt, saltRounds)});

app.get("/profile/:id", (req, res) => { profile.getProfile(req, res, database) });

app.put("/image", (req, res) => { entires.updateEntries(req, res, database)});

app.post("/imageUrl", (req, res) => { entires.handleApiCall(req, res)});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});