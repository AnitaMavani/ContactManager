## Frontend

## Overview

This is the frontend for the TypeFlowReactMaterial, a full-stack Contact Management System, built with React, TypeScript, and Material-UI. It provides a dynamic user interface for managing contacts with features like add, edit, delete, and view contacts. It also includes user authentication, allowing users to register and log in securely. The application is structured using React Router for seamless navigation between pages such as Contact List, Contact Form, Login, and Register. It is built to be responsive, ensuring optimal use on both mobile and desktop devices.

---

## Features

- Built with **React + TypeScript**.
- **Material-UI** for modern UI components.
- **React Router** for navigation.
- Contact management (CRUD).
- User authentication (Login/Register).
- Responsive design for mobile and desktop.

## Folder Structure

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

## Setup

1. **Install Dependencies**:
   Navigate to the `frontend` directory and install the necessary dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. **Start the Development Server**:

```bash
   npm start
```

This will start the development server and make the application available at `http://localhost:3000

## Technologies

**Frontend**:

- React
- TypeScript
- Material UI
- React Router
- Axios (For API requests)
- JWT (JSON Web Token) for authentication

## Key Components

### Contact Page

- Displays a list of contacts.
- Allows users to add, edit, or delete contacts.

### Login/Register Pages

- Handle user authentication.
- Allows users to register and log in.
