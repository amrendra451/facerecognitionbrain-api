const handleRegister = (req, res, database, bcrypt, saltRounds) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json("Incorrect form submittion");
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    database.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into("login")
        .returning("email")
        .then(logginEmail => {
            return trx("users")
                .returning("*")
                .insert({
                    email: logginEmail[0],
                    name: name,
                    joined: new Date()
                }).then(user => {
                    res.status(200).send(user[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(error => res.status(400).json("Unable to register"));
};

module.exports = {
    handleRegister: handleRegister
};