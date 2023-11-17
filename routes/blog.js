const express = require('express');
const db = require('../data/database');
const router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/index');
});

router.get('/index', function (req, res) {
    res.render('index');
});

router.get('/form', async function (req, res) {
    try {
        const authors = await db.query('SELECT * FROM authors');
        res.render('form', { authors:authors });
    } catch (error) {
        console.error('Error fetching authors:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
