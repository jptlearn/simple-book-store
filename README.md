# Book Store Application

A full-stack web application for managing and exploring books, built with React.js and Node.js.

## Features

- 📚 Browse books with search functionality
- ➕ Add new books with image uploads
- 🗑️ Delete existing books
- 📖 View detailed book information
- 🔍 Search books by name or author
- 📱 Responsive design

## Tech Stack

### Frontend

- React.js
- React Router DOM for navigation
- Axios for API requests
- SASS for styling
- React Toastify for notifications
- React Icons

### Backend

- Node.js with Express.js
- MySQL database with Sequelize ORM
- Multer for file uploads
- CORS for cross-origin resource sharing

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd book-store
```

2. Backend Setup:

```bash
cd backend
npm install
```

Create a .env file in the backend directory and add the following environment variables:

```plaintext
PORT=8000
DB_NAME=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_HOST=localhost

```

3. Frontend Setup:

```bash
cd frontend
npm install
```

## Running the Application

1. Start the backend server:

```bash
cd backend
npm start
```

2. Start the frontend development server:

```bash
cd frontend
npm start
```

## API Endpoints

### Books

- GET /book: Get all books
- GET /book/:id: Get a specific book by ID
- POST /book: Create a new book
- PUT /book/:id: Update a book by ID
- DELETE /book/:id: Delete a book by ID
- GET /book/search: Search books by name or author

## Project Structure

### Backend

backend/
├── src/
│ ├── controllers/
│ │ └── book.controller.js
│ ├── middlewares/
│ │ └── multer.middleware.js
│ ├── models/
│ │ ├── index.js
│ │ └── book.model.js
│ ├── routes/
│ │ └── book.route.js
│ └── index.js

### Frontend

frontend/
├── public/
├── src/
│ ├── api/
│ │ └── config.js
│ ├── assets/
│ │ └── sass/
│ ├── pages/
│ │ ├── AddBook.js
│ │ ├── Dashboard.js
│ │ ├── Explore.js
│ │ ├── HomePage.js
│ │ └── ListBook.js
│ ├── App.js
│ └── index.js

## Contributing

- Fork the repository
- Create your feature branch ( git checkout -b feature/amazing-feature )
- Commit your changes ( git commit -m 'Add some amazing feature' )
- Push to the branch ( git push origin feature/amazing-feature )
- Open a Pull Request
