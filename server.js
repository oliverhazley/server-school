const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;

// Sample in-memory data
let data = [{ id: 1, name: 'Sample Item' }];

// Get all data
app.get('/api/data', (req, res) => {
    res.status(200).json(data);
});

// Add new data
app.post('/api/data', (req, res) => {
    const newItem = req.body;
    if (!newItem || !newItem.name) {
        return res.status(400).json({ error: 'Invalid data' });
    }
    newItem.id = data.length + 1;
    data.push(newItem);
    res.status(201).json(newItem);
});

// Delete data
app.delete('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    data.splice(index, 1);
    res.status(204).send();
});

// Update data
app.put('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    const updatedItem = req.body;
    if (!updatedItem || !updatedItem.name) {
        return res.status(400).json({ error: 'Invalid data' });
    }
    data[index] = { id, ...updatedItem };
    res.status(200).json(data[index]);
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// Search Endpoint
app.get('/api/data/search', (req, res) => {
    const query = req.query.name?.toLowerCase();
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "name" is required' });
    }
    const results = data.filter(item => item.name.toLowerCase().includes(query));
    res.status(200).json(results);
});


// Pagination

app.get('/api/data', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = data.slice(startIndex, endIndex);
    res.status(200).json(results);
});
