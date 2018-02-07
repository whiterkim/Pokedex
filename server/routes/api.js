const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
        if (err) return console.log(err);
        var dbo = db.db("pokedex");
        closure(dbo);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

router.get('/pokemon-list', (req, res) => {
    console.log('GET /pokemon-list');
    connection((db) => {
        db.collection('pokemon')
            .find()
            .toArray()
            .then((x) => {
                response.data = x;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});
router.get('/ability-list', (req, res) => {
    console.log('GET /ability-list');
    connection((db) => {
        db.collection('ability')
            .find()
            .toArray()
            .then((x) => {
                response.data = x;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;