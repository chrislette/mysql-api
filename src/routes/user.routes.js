const express = require('express');
const { getMe, updateMe } = require('../controllers/user.controller');
const canAccess = require('../middleware/auth.middleware');

const userRoutes = express.Router();

userRoutes.get('/me', canAccess, getMe);

userRoutes.put('/me/update', canAccess, updateMe);

module.exports = userRoutes;