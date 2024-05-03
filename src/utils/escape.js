const escape = require('mysql').escape;

module.exports = (body) => {
    return Object.keys(body).reduce((acc, key) => {
        acc[key] = escape(body[key]);
        return acc;
    }, {});
};
