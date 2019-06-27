const signIn = (req, res, database, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json("Incorrect form submittion");
    }
    database.select("email", "hash").from("login")
        .where("email", "=", email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return database.select("*").from("users")
                    .where("email", "=", email)
                    .then(user => res.status(200).send(user[0]))
                    .catch(error => res.status(400).send("User not found"));
            } else {
                res.status(400).json("Invalid Username or Password");   
            }
        })
        .catch(error => res.status(400).json("Invalid Username or Password")); 
};

module.exports = {
    signIn: signIn
};