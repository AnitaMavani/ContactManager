## 📂 ContactManager - Contact Management System

A full-stack Contact Management System using React + TypeScript + Express application with authentication and CRUD operations.

## ✅ Overview

This application allows users to register, log in, and manage contacts. Any users can add the contacts while Authenticated users can add, edit, delete, and list contacts. The frontend is built with React (TypeScript) + Material-UI, while the backend is powered by Node.js + Express.

---

## Features

### Frontend (React + TypeScript)

- **Material-UI Integration**: Styled components for a modern UI.
- **React Router**: Navigation between multiple pages.
- **Authentication**: User registration and login.
- **Contacts Page**: Users can add, edit, delete, and list contacts.
- **Responsive Design**: Works on both mobile and desktop.

### Backend (Express + Node.js)

- **RESTful API**: Handles user authentication and contact management.
- **User Authentication**: Uses JWT for secure login sessions.
- **CRUD Operations**: Contacts can be added, updated, deleted, and retrieved.
- **Express Middleware**: Uses CORS, body-parser, and authentication middleware.

---

## 🚀 Folder Structure

```
   ContactManager/
   │── frontend/ # React + TypeScript + Material-UI
   │── backend/ # Express.js + Node.js
   │── package.json # Main package.json for managing frontend & backend
   │── README.md # Project documentation
```

**_Frontend (frontend/)_**

```
frontend/
│── node_modules/
│── public/
│   ├── assets/
│   ├── index.html
│── src/
│   ├── components/
│   │   ├── Header.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   ├── hooks/
│   │   ├── useAuth.tsx
│   │   ├── useForm.tsx
│   ├── pages/
│   │   ├── About.tsx
│   │   ├── Auth.tsx
│   │   ├── Contact.tsx
│   │   ├── Home.tsx
│   ├── routes/
│   │   ├── routes.tsx
│   ├── utils/
│   │   ├── Validation.ts
│   │   ├── ValidationRules.ts
│   ├── styles/
│   │   ├── App.css
│   │   ├── index.css
│   ├── App.tsx
│   ├── index.tsx
│── package.json
│── README.md
```

**_Backend (backend/)_**

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

## ⚙️ Installation & Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/AnitaMavani/ContactManager
   cd ContactManager
   ```

2. **Install Dependencies**:

   ```bash
   npm run install
   ```

3. **Run the Application**:
   To start both frontend and backend together:

   ```bash
   npm start
   ```

## 📡 API Endpoints

-POST /api/auth/register → Register a user
-POST /api/auth/login → Login and receive a JWT token
-GET /api/contacts → Fetch all contacts (protected)
-POST /api/contacts → Add a new contact (protected)
-PUT /api/contacts/:id → Edit a contact (protected)
-DELETE /api/contacts/:id → Delete a contact (protected)

## 📦 Technologies Used

**Frontend**:

- React
- Typescript
- Material UI
- React Router
- Node.js

**Backend**:

- Node.js
- Express.js

## 👨‍💻 Author

Anita Mavani
