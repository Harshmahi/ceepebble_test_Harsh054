const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Sample data (initial items)
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];


app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.json(newItem);
});


app.get('/items', (req, res) => {
  res.json(items);
});


app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const itemIndex = items.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    items[itemIndex] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1)[0];
    res.json(deletedItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});