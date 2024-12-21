const db = require('../database/db');

const getAllUsers = (req, res) => {
    const q = "SELECT * FROM users"
    db.query(q, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getUserById = (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (error, result) => {
        if (error) throw error;
        res.status(200).json(result);
    });
};

module.exports = {
    getAllUsers
}