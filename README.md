# 🎬 Movie Management System

This project is a **Movie Management System** built with **Node.js** and **Express**, allowing users to manage and create their personalized movie lists. The system provides features for adding, updating, and managing movie lists for registered users.

## 🚀 Features

### User Management:
- **Register and Login**: Users can create an account and log in using their credentials.
- **Profile Management**: Users can manage their profile information and movie lists.
  
### Movie List Management:
- **Add Movies**: Users can add movies to their personal movie list.
- **Edit and Delete Movies**: Users can update or remove movies from their list.
- **View Movie List**: Users can view their personalized movie collection.

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime for backend development.
- **Express**: Web framework for building REST APIs.
- **MongoDB** & **Mongoose**: NoSQL database and ORM for data management.
- **JWT**: For user authentication and session management.
- **Bcrypt**: For securely hashing and storing user passwords.

## 🔄 System Workflow

### User Registration and Authentication:
- Users register and log in using **JWT** for session management.
- Passwords are securely hashed using **Bcrypt**.

### Movie List Management:
- Users can add movies to their personal collection by providing details such as title, genre, and release year.
- Users can edit or delete movies as needed.
- The system ensures that each user has their own unique movie list.

### Movie Search and Filtering:
- Users can search within their movie lists.
- Movies can be filtered by title, genre, or release year.

## ⚙️ How It Works

1. **User Registration**: Users sign up, log in, and manage their profile.
2. **Movie Management**: Users add, edit, delete, and view movies from their personalized movie list.
3. **Authentication**: Secure authentication using **JWT** ensures that only logged-in users can access and modify their movie list.

## 🧰 Installation

1. Clone the repository:
   ```bash
   https://github.com/A7N8M6D/Movie-Backend.git
