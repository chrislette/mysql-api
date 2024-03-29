const con = require('../db-config');
const queries = require('../queries/scores.queries');

exports.getAllScores = function(req, res) {
    con.query(queries.ALL_SCORES, function(err, results, fields) {
        if (err) {
            res.send(err);
        }
        res.json(results);
    });
};

exports.getScore = function(req, res) {
    con.query(queries.SINGLE_SCORE, [req.params.scoreId], function(err, data) {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
};

exports.createScore = function(req, res) {
    con.query(queries.INSERT_SCORE, [req.body.score, req.body.user], function(err, result) {
        if (err) {
            res.send(err);
        }
        console.log(result);
        res.json({ message: 'Number of records inserted: ' + result.affectedRows });
    });
};

exports.updateScore = function(req, res) {
    con.query(queries.UPDATE_SCORE, [req.body.score, req.body.user, req.params.scoreId], function(err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

exports.deleteScore = function(req, res) {
    con.query(queries.DELETE_SCORE, [req.params.scoreId], function(err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Deleted successfully.' });
    });
};