const bcrypt = require('bcryptjs');

const connection = require('../db-config');
const {
    GET_ME_BY_USERNAME,
    GET_ME_BY_USERNAME_WITH_PASSWORD,
    INSERT_NEW_USER
} = require('../queries/user.queries')
const query = require('../utils/query');
const { refreshTokens, generateAccessToken, generateRefreshToken } = require('../utils/jwt-helpers');
const { verifyToken } = require('../utils/jwt-helpers');
const { jwtconfig } = require('../utils/jwt-helpers');

exports.register = async (req, res) => {
    // params setup
    const passwordHash = bcrypt.hashSync(req.body.password);
    const params = [req.body.username, req.body.email, passwordHash];

    // establish a connection
    const con = await connection().catch((err) => {
        throw err;
    });

    // check for existing user first
    const user = await query(con, GET_ME_BY_USERNAME, [req.body.username]).catch(
        (err) => {
            res.status(500);
            res.send({ msg: 'Could not retrieve user.' });
        }
    );

    // if we get one result back
    if (user.length === 1) {
        res.status(403).send({ msg: 'User already exists!' });
    } else {
    
        // add new user
        const result = await query(con, INSERT_NEW_USER, params).catch((err) => {
            //   stop registeration
            res
                .status(500)
                .send({ msg: 'Could not register user. Please try again later.' });
        });
            
        if (!!result) {
            res.send({ msg: 'New user created!' });
        }
    }
};

exports.login = async (req, res) => {
    // establish a connection
    const con = await connection().catch((err) => {
        throw err;
    });

    // check for existing user first
    const user = await query(con, GET_ME_BY_USERNAME_WITH_PASSWORD, [
        req.body.username,
    ]).catch((err) => {
        res.status(500);
        res.send({ msg: 'Could not retrieve user.' });
    });

    // if the user exists
    if (user.length === 1) {
        // validate entered password from database saved password
        const validPass = await bcrypt
            .compare(req.body.password, user[0].password)
            .catch((err) => {
                res.json(500).json({ msg: 'Invalid password!' });
            });

        if (!validPass) {
            res.status(500).send({ msg: 'Invalid password!' });
        }
        // create token
        const accessToken = generateAccessToken(user[0].user_id, { 
            expiresIn: 86400 
        });
        const refreshToken = generateRefreshToken(user[0].user_id, { 
            expiresIn: 86400 
        });

        refreshTokens.push(refreshToken);

        res
            .header('access_token', accessToken)
            .send({
                auth: true,
                msg: 'Logged in!',
                token_type: 'bearer',
                access_token: accessToken,
                expires_in: 86400,
                refresh_token: refreshToken,
            });
            
    }
};

exports.token = (req, res) => {
    const refreshToken = req.body.token;

    // stop user auth validation if no token provided
    if (!refreshToken) {
        res
            .status(401)
            .send({ auth: false, msg: 'Access Denied. No token provided.' });
    }

    // stop refresh if refresh token is invalid
    if (!refreshTokens.includes(refreshToken)) {
        res.status(403).send({ msg: 'Invalid Refresh Token' });
    }

    const verified = verifyToken(refreshToken, jwtconfig.refresh, req, res);

    if (verified) {
        const accessToken = generateAccessToken(user[0].user_id, { expiresIn: 86400 });
        res
            .header('access_token', accessToken)
            .send({
                auth: true,
                msg: 'Logged in!',
                token_type: 'bearer',
                access_token: accessToken,
                expiresIn: 20,
                refreshToken: refreshToken,
            });
    }

    res.status(403).send({ msg: 'Invalid Token' });
};

exports.logout = (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((t) => t !== refreshToken);

    res.send({ msg: 'Logout successful' });
}


