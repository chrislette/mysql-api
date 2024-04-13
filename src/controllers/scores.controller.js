const connection = require('../db-config');
const {
    ALL_SCORES,
    SINGLE_SCORE,
    INSERT_SCORE,
    UPDATE_SCORE,
    DELETE_SCORE,
} = require('../queries/scores.queries');
const query = require('../utils/query');

exports.getAllScores = async (req, res) => {
    // establish a connection
    const con = await connection().catch((err) => {
        throw err;
    });

    const scores = await query(con, ALL_SCORES).catch((err) => {
        res.send(err);
    });

    if (scores.length) {
        res.json(scores)
    }
};

exports.getScore = async (req, res) => {
    const con = await connection().catch((err) => {
        throw err;
    });

    const score = await query(con, SINGLE_SCORE, [req.params.scoreId]).catch((err) => {
        res.send(err);
    });

    if (score.length) {
        res.json(score)
    }
};


exports.createScore = async (req, res) => {

    const con = await connection().catch((err) => {
        throw err;
    });

    const result = await query(con, INSERT_SCORE, [req.body.score, req.body.user]).catch(
        (err) => {
            res.send(err)
        }
    );

    if (result.affectedRows === 1) {
        res.json({ msg: 'Added score successfully!' });
    }
};

exports.updateScore = async (req, res) => {

    const con = await connection().catch((err) => {
        throw err;
    });

    const result = await query(con, UPDATE_SCORE, [
        req.body.score,
        req.body.user,
        req.params.scoreId
    ]).catch((err) => {
        res.send(err);
    });

    if (result.affectedRows === 1) {
        res.json(result);
    }
};

exports.deleteScore = async (req, res) => {

    const con = await connection().catch((err) => {
        throw err;
    });

    const result = await query(con, DELETE_SCORE, [req.params.scoreId]).catch(
        (err) => {
            res.send(err);
        }
    );

    if (result.affectedRows === 1) { 
        res.json({ msg: 'Deleted successfully.' });
    }
};
