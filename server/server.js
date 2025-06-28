import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/budget-bites', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Grocery List Schema
const groceryListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [{
    name: { type: String, required: true },
    quantity: { type: String, default: '1' },
    category: { type: String, default: 'General' },
    completed: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const GroceryList = mongoose.model('GroceryList', groceryListSchema);

// API Routes

// Get all grocery lists
app.get('/api/grocery-lists', async (req, res) => {
  try {
    const lists = await GroceryList.find().sort({ updatedAt: -1 });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific grocery list
app.get('/api/grocery-lists/:id', async (req, res) => {
  try {
    const list = await GroceryList.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: 'Grocery list not found' });
    }
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new grocery list
app.post('/api/grocery-lists', async (req, res) => {
  try {
    const { name, items } = req.body;
    const newList = new GroceryList({
      name,
      items: items || []
    });
    const savedList = await newList.save();
    res.status(201).json(savedList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a grocery list
app.put('/api/grocery-lists/:id', async (req, res) => {
  try {
    const { name, items } = req.body;
    const updatedList = await GroceryList.findByIdAndUpdate(
      req.params.id,
      {
        name,
        items,
        updatedAt: Date.now()
      },
      { new: true }
    );
    if (!updatedList) {
      return res.status(404).json({ message: 'Grocery list not found' });
    }
    res.json(updatedList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a grocery list
app.delete('/api/grocery-lists/:id', async (req, res) => {
  try {
    const deletedList = await GroceryList.findByIdAndDelete(req.params.id);
    if (!deletedList) {
      return res.status(404).json({ message: 'Grocery list not found' });
    }
    res.json({ message: 'Grocery list deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle item completion
app.patch('/api/grocery-lists/:id/items/:itemIndex', async (req, res) => {
  try {
    const list = await GroceryList.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: 'Grocery list not found' });
    }
    
    const itemIndex = parseInt(req.params.itemIndex);
    if (itemIndex >= 0 && itemIndex < list.items.length) {
      list.items[itemIndex].completed = !list.items[itemIndex].completed;
      list.updatedAt = Date.now();
      const updatedList = await list.save();
      res.json(updatedList);
    } else {
      res.status(400).json({ message: 'Invalid item index' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 