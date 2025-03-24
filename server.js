const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration des fichiers statiques
app.use(express.static(path.join(__dirname, 'www')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// Routes
app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'www', 'index.html'));
    } catch (error) {
        console.error('Erreur lors du chargement de index.html:', error);
        res.status(500).send('Erreur lors du chargement de la page');
    }
});

app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Validation basique
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Tous les champs sont requis' 
            });
        }

        // Log du formulaire
        console.log('Nouvelle soumission de contact:', {
            timestamp: new Date().toISOString(),
            name,
            email,
            message
        });

        res.json({ 
            success: true, 
            message: 'Message reçu avec succès' 
        });
    } catch (error) {
        console.error('Erreur lors du traitement du contact:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur lors du traitement de votre demande' 
        });
    }
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'www', '404.html'));
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error('Erreur serveur:', err);
    res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
    });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log('=================================');
    console.log('🚀 Le serveur est en route');
    console.log(`📡 http://localhost:${port}`);
    console.log('=================================');
});