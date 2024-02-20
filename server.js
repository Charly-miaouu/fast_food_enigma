const express = require('express');
const app = express();

app.use(express.json());

const supabase = require('@supabase/supabase-js');
const db = supabase.createClient('https://oyyzhkscckuzawiaghrn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95eXpoa3NjY2t1emF3aWFnaHJuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwODQzNTYzNiwiZXhwIjoyMDI0MDExNjM2fQ.1S1kLAvbd-juFy6dbKMNOmEU8-xSYNkr5nBr1sjMbnU');

// Commandes
const commandes = [];

// Récupérer la liste des produits
app.get('/produits', async (req, res) => {
    try {
        const { data, error } = await db.from('Produits').select();
        if (error) throw error;
        res.send(data);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
    }
});

// Ajouter des produits
app.post('/ajouter_produits', async (req, res) => {
    try {
        const { error } = await db.from('Produits').upsert([
            { id: 4, nom: 'produit4' },
            { id: 5, nom: 'produit5' },
            { id: 6, nom: 'produit6' },
        ]);
        if (error) throw error;
        res.json({ message: 'Produits ajoutés avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout des produits' });
    }
});

// Mettre à jour des produits
app.put('/maj_produits/:id', async (req, res) => {
    const produitId = req.params.id;
    try {
        const { error } = await db.from('Produits').update({ nom: 'produittest4' }).eq('id', produitId);
        if (error) throw error;
        res.json({ message: 'Produit mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
    }
});

// Récupérer la liste des catégories
app.get('/categories', async (req, res) => {
    try {
        const { data, error } = await db.from('Catégorie').select();
        if (error) throw error;
        res.send(data);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
    }
});

// Commander
app.post('/commander', (req, res) => {
  const commande = req.body;
  commandes.push(commande);
  res.json({ message: 'Commande passée avec succès', commande });
});

// Récupérer la liste des commandes
app.get('/commandes', (req, res) => {
  res.json(commandes);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
