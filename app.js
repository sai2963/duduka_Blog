// app.js
const path = require('path');
const express = require('express');
const blogroutes = require('./routes/blog');
const db = require('./data/database');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('frontend'));
app.use(blogroutes);
app.use(db);
// Add a route for /index


app.use(function (error, req, res, next) {
    console.log('error');
    res.status(500).render('500');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
