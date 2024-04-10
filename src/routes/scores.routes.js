const controllers = require('../controllers/scores.controller');
const express = require('express');

const scoresRoutes = express.Router();

/**
 * Routes for all scores. Evaluates to `/scores`.
 */
scoresRoutes
    .get('/', controllers.getAllScores)
    .post('/', controllers.createScore);

/**
 * Routes for a score by ID. Evaluates to `/scores/:scoreId`.
 */
scoresRoutes
    .get('/:scoreId', controllers.getScore)
    .put('/:scoreId', controllers.updateScore)
    .delete('/:scoreId', controllers.deleteScore)

module.exports = scoresRoutes;