const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: 123,
            name: "Sachin",
            email: "sachin@gmail.com",
            password: "sachin",
            enteries: 0,
            joined: new Date()
        },
        {
            id: 124,
            name: "Shive",
            email: "shiva@gmail.com",
            password: "shiva",
            enteries: 0,
            joined: new Date()
        }
    ]
}

app.get("/", (req, res) => {
    res.status(200).send(database.users);
});

app.post("/signin", (req, res) => {
    const { email, password } = req.body;
    // Load hash from your password DB.
    // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    //     // res == true
    // });
    // bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
    //     // res == false
    // });
    if (email === database.users[0].email && password === database.users[0].password) {
        res.status(200).send(database.users[0]);
    } else {
        res.status(400).send("Erron in Login");
    }
});

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
      });
    database.users.push({
        id: 125,
        name: name,
        email: email,
        password: password,
        enteries: 0,
        joined: new Date()
    });
    res.status(200).send("Register Successfully");
});

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id == id) {
            found = true;
            return res.status(200).send(user);
        }
    });
    if (!found) {
        res.status(400).send("User not found");
    }
});

app.put("/image", (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id == id) {
            found = true;
            user.enteries++;
            return res.status(200).json(user.enteries);
        }
    });
    if (!found) {
        res.status(400).send("User not found");
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});