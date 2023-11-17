// blog.js
const express = require('express');
const db = require('../data/database');
const router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/index');
});

router.get('/index', async function (req, res) {
    try {
        const query = `SELECT post.*, authors.NAME AS author_name FROM post INNER JOIN authors ON post.AUTHOR_ID = authors.ID`;
        const [index] = await db.query(query);
        res.render('index', { index: index });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/form', async function (req, res) {
    try {
        const [authors] = await db.query('SELECT * FROM authors');
        res.render('form', { authors: authors });
    } catch (error) {
        console.error('Error fetching authors:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/form', async function (req, res) {
    try {
        const { titlename, summaryname, contenname, Author } = req.body;
        const query = `
            INSERT INTO post (TITLE, SUMMARY, BODY, AUTHOR_ID, DATE)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        `;
        await db.query(query, [titlename, summaryname, contenname, Author]);

        // Redirect to /index after successful submission
        res.redirect('/index');
    } catch (error) {
        console.error('Error submitting form:', error);
        // Send a more informative error message to the client
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
});

module.exports = router;
