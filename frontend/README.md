
# Pizza Management Application

A full-stack application for managing pizzas and their toppings, allowing users to perform CRUD operations on both entities.

## Technologies Used

### Frontend
- React with Vite
- CSS for styling
- Axios for API requests

### Backend
- Node.js with Express
- PostgreSQL for database management
- dotenv for environment variables

## Setup Instructions

### Prerequisites
- Node.js and npm installed on your system
- PostgreSQL installed and running locally

### Clone the Repository
```bash
git clone [repository-url]
cd pizza-management
```

### Install Dependencies
#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

## Running the Application

### Start the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Set up environment variables in the `.env` file (e.g., database credentials).
3. Start the backend server:
   ```bash
   npm start
   ```

### Start the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Start the frontend server:
   ```bash
   npm run dev
   ```

Access the application in your browser at the URL provided by Vite (e.g., `http://localhost:3000`).

## Testing

### Frontend
Run tests using the following command from the `frontend` directory:
```bash
npm test
```

### Backend
Run tests using the following command from the `backend` directory:
```bash
npm test
```

## Folder Structure

### Frontend
- `src`: Contains React components and application logic
- `public`: Static assets

### Backend
- `controllers`: Backend logic for handling requests
- `models`: Database models
- `routes`: API endpoints
- `database`: Configuration and setup

## Future Enhancements
- Add user authentication
- Improve error handling and validation
- Enhance the UI for better usability

## Author
Aj Smith
