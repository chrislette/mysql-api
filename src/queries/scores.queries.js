exports.CREATE_SCORES_TABLE = `CREATE TABLE IF NOT EXISTS scores(
    id int NOT NULL AUTO_INCREMENT,
    score int NOT NULL,
    user varchar(30) NOT NULL,
    time_scored DATETIME DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (id)
)`;

/** Get every score */
exports.ALL_SCORES = `SELECT * FROM scores`;

/** Get a single score */
exports.SINGLE_SCORE = `SELECT * FROM scores WHERE id = ?`;

/** Create a new score in `scores` table where column names match the order they are in the table */
exports.INSERT_SCORE = `INSERT INTO scores (score, user) VALUES (?, ?)`;

/** Update a score by ID */
exports.UPDATE_SCORE = `UPDATE scores SET score = ?, user = ? WHERE id = ?`;

/** Delete a score by ID */
exports.DELETE_SCORE = `DELETE FROM scores WHERE id = ?`;