const getProfile = (req, res, database) => {
    const { id } = req.params;
    database.select("*").from("users").where({id})
        .then(user => {
            if (user.length) {
                res.status(200).send(user[0]);
            } else {
                res.status(400).json("User not found");
            }
        })
        .catch(error => res.status(400).json("Error in getting user"));
};

module.exports = {
    getProfile: getProfile
};