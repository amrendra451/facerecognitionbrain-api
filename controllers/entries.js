const Clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: "f0a3c48626c14107b19dadaa30219446"
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json("Unable to detect face."));
}

const updateEntries = (req, res, database) => {
    const { id } = req.body;
    database("users").where("id", "=", id)
        .increment("entries", 1)
        .returning("entries")
        .then(entry => {
            res.status(200).send(entry[0]);
        }).catch(error => res.status(400).json("Error in updating entries."));
};

module.exports = {
    updateEntries: updateEntries,
    handleApiCall: handleApiCall
};