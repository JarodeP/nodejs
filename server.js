const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();
const port = 3000;

// Configuration EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'www/views'));  // Changé ici
app.set('layout', 'layouts/main');

// Configuration des fichiers statiques
app.use(express.static(path.join(__dirname, 'www')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'MonSite',
        description: 'Un site créé avec Bootstrap et Node.js'
    });
});