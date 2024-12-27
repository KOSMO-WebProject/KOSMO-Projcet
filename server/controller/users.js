const db = require('../database/db');

const getAllUsers = (req, res) => {
    const q = "SELECT * FROM users"
    db.get().execute(q, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getUserById = (req, res) => {
    db.get().execute()('SELECT * FROM users WHERE id = ?', [req.params.id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

module.exports = {
    getAllUsers,
    getUserById
}