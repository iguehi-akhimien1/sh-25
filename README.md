# Budget Bites - Smart Grocery Shopping App

A React-based web application that helps users find cheap locations to buy food on their grocery list. Users can create, save, and manage grocery lists with MongoDB integration.

## Features

- 🛒 **Grocery List Management**: Create, edit, and delete grocery lists
- 💾 **MongoDB Integration**: Save and retrieve grocery lists from database
- ✅ **Item Tracking**: Mark items as completed and track progress
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Clean, intuitive interface with smooth interactions

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies (already included in package.json)
```

### 2. MongoDB Setup

#### Option A: Local MongoDB

1. Install MongoDB locally on your machine
2. Start MongoDB service
3. The app will connect to `mongodb://localhost:27017/budget-bites`

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Create a `.env` file in the root directory with:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   ```

### 3. Start the Application

#### Terminal 1: Start the Backend Server

```bash
npm run server
```

The server will start on `http://localhost:5000`

#### Terminal 2: Start the Frontend Development Server

```bash
npm run dev
```

The React app will start on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
sh-25/
├── src/
│   ├── App.tsx              # Main app component with routing
│   ├── Home.tsx             # Home page component
│   ├── Features.tsx         # Features showcase page
│   ├── Message.tsx          # Welcome message component
│   ├── GroceryList.tsx      # Grocery list management component
│   └── ...
├── server/
│   └── server.js            # Express server with MongoDB integration
├── public/
│   └── cart.jpg             # App logo
└── package.json
```

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/grocery-lists` - Get all grocery lists
- `GET /api/grocery-lists/:id` - Get a specific grocery list
- `POST /api/grocery-lists` - Create a new grocery list
- `PUT /api/grocery-lists/:id` - Update a grocery list
- `DELETE /api/grocery-lists/:id` - Delete a grocery list
- `PATCH /api/grocery-lists/:id/items/:itemIndex` - Toggle item completion

## Grocery List Features

### Creating Lists

- Click "Create New List" in the sidebar
- Enter a list name
- Click "Create List" to save

### Adding Items

- Select a list from the sidebar
- Use the "Add New Item" form
- Enter item name, quantity, and category
- Click "Add" to add the item

### Managing Items

- Check/uncheck items to mark as completed
- Remove items using the "Remove" button
- Items are automatically saved to MongoDB

### Saving Lists

- Lists are automatically saved when you make changes
- Use the "Save List" button for manual saves
- All changes persist in the database

## Technologies Used

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Inline CSS with modern design patterns
- **HTTP Client**: Axios for API communication

## Development

### Available Scripts

- `npm run dev` - Start the frontend development server
- `npm run server` - Start the backend server
- `npm run build` - Build the frontend for production
- `npm run lint` - Run ESLint for code quality

### Adding New Features

1. Create new components in the `src/` directory
2. Add new routes in `src/App.tsx`
3. Create new API endpoints in `server/server.js`
4. Update the navigation in header components

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running locally
   - Check your connection string in `.env`
   - Verify network connectivity for Atlas

2. **Port Already in Use**

   - Change the PORT in `.env` file
   - Kill processes using the default ports

3. **CORS Errors**
   - The server is configured with CORS enabled
   - Ensure you're accessing the correct URLs

## Future Enhancements

- [ ] Price comparison features
- [ ] Store location integration
- [ ] Shopping history analytics
- [ ] Meal planning integration
- [ ] Barcode scanning
- [ ] Push notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
