const express = require('express');
const app = express();
const port = 3000;

// Configuration des fichiers statiques
app.use(express.static(__dirname + '/www'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/www/index.html');
});

// Démarrage du serveur
app.listen(port, () => {
    console.log('Le serveur est en route');
    console.log(`Serveur accessible à l'adresse : http://localhost:${port}`);
});