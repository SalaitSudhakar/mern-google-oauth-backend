# MERN Google OAuth Backend

A simple Express backend server that handles Google OAuth authentication for a MERN stack application.

## Tech Stack

- Node.js
- Express
- MongoDB
- Bcryptjs
- Firebase Google Authentication
- JWT

## Setup

1. Clone the repository

```bash
git clone https://github.com/SalaitSudhakar/mern-google-oauth-backend.git
cd mern-google-oauth/backend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file with the following:

```
PORT=5000

MONGO_URI=mongodb_uri

NODE_ENV=developement || production

JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_API_KEY=your_api_key

FRONTEND_URL=http://localhost:3000
```

4. Start the server

```bash
npm run dev
```

## Features

- Google OAuth authentication
- Bcryptjs Hashing Passwords
- JWT token-based authentication
- User registration and login
- Protected routes
- User profile management

## API Routes

- `/api/auth/google` - Google authentication
- `/api/auth/singup` - User Sign Up
- `/api/auth/signin` - User Sign In
- `/api/auth/singout` - User Sign out

- `/api/user/update/:id` - Update User Profile
- `/api/user/delete/:id` - Delete User Profile

## Author

- GitHub: [@SalaitSudhakar](https://github.com/SalaitSudhakar)
