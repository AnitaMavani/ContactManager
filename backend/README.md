# 📂 Backend API for Contact Management System

## ✅ Description

This is the backend API for a Contact Management System with authentication (login & registration).

- Users can register and login to receive a JWT token.
- Authenticated users can create, retrieve, update, and delete their own contacts.
- Non-authenticated users can only create contacts (no retrieval, update, or delete).
- The app uses **Node.js**, **Express**, **MySQL**, **JWT**, and **bcryptjs**.

---

## 🚀 Folder Structure

```
/backend
│src
├── config/
│   └── db.js            # Database connection setup
├── controllers/
│   └── contactController.js  # Contact CRUD logic
│   ├── userController.js     # Authentication logic (register/login)
├── middleware/
│   └── authMiddleware.js     # JWT verification middleware
├── └── contactValidation.js
├── └── errorHandler.js
├── models/
│   ├── userModel.js          # User model queries
│   └── contactModel.js       # Contact model queries
├── routes/
│   └── contactRoutes.js      # Routes for contact APIs
│   ├── userRoutes.js         # Routes for register & login
├── app.js                   # Main app setup
├── server.js                # Express server setup
├.env                  # Environment variables (DB info, JWT secret)
├package.json          # Project metadata & dependencies
└── README.md          # Project documentation
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/AnitaMavani/ContactManager/backend
cd ContactManager/backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up `.env` file**  
   Create a `.env` file in the root with:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=db_name
JWT_SECRET=your_secret_key
PORT=5001
```

4. **Start the server**

```bash
npm start
```

> The server will run on `http://localhost:5001`

---

## 🗄️ Database Setup

1. Open your MySQL client and run:

```sql
CREATE DATABASE contact_db;

USE contact_db;

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 📡 API Endpoints

### ➡ Authentication (Public)

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register new user      |
| POST   | `/api/auth/login`    | Login user & get token |

### ➡ Contacts

| Method | Endpoint            | Description                              | Auth Required         |
| ------ | ------------------- | ---------------------------------------- | --------------------- |
| POST   | `/api/contacts`     | Create a new contact (public or private) | No (optional user_id) |
| GET    | `/api/contacts`     | Get all contacts for logged-in user      | ✅ Yes                |
| PUT    | `/api/contacts/:id` | Update a contact (logged-in user only)   | ✅ Yes                |
| DELETE | `/api/contacts/:id` | Delete a contact (logged-in user only)   | ✅ Yes                |

---

## ✅ Important Notes:

- All protected routes require `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

- Only the logged-in user can view, update, and delete their contacts.
- Anyone (even without login) can create a contact.

---

## 📦 Dependencies Used:

- express
- mysql
- dotenv
- jsonwebtoken
- bcryptjs
- cors
- body-parser
- nodemon (dev)

---

## 👨‍💻 Author

Anita Mavani
