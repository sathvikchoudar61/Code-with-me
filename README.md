# Code with me - Full-Stack Coding Platform

A comprehensive coding platform designed to provide a seamless environment for coding, compiling, and solving algorithmic questions. Built with the MERN stack and modern frontend tools.

## 🚀 Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/) (`@monaco-editor/react`)
- **Icons & UI**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JSON Web Token (JWT)](https://jwt.io/) & [BCryptJS](https://www.npmjs.com/package/bcryptjs)
- **Email Service**: [Nodemailer](https://nodemailer.com/) & [Mailtrap](https://mailtrap.io/)

## ✨ Features

- **User Authentication**: Secure Signup and Login functionality with JWT.
- **Code Editor**: Integrated Monaco Editor for a rich coding experience.
- **Problem Solving**: Interface to view and solve coding questions.
- **Compiler Integration**: Backend support for compiling and running code (`/api/compiler`).
- **Email Notifications**: Integrated email services for user communication (e.g., verification, password reset).

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "code with me"
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   MAILTRAP_TOKEN=your_mailtrap_token
   CLIENT_URL=http://localhost:5173
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   (Optional) configure `.env` if your frontend requires specific environment variables.

## 🚀 Running the Application

1. **Start the Backend Server**
   ```bash
   # From root or backend directory
   npm run dev
   ```
   The backend will start on `http://localhost:5000`.

2. **Start the Frontend Development Server**
   ```bash
   # From frontend directory
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

## 📂 Project Structure

```
├── backend/            # Express.js backend server
│   ├── db/             # Database connection logic
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes (questions, compiler, authentication)
│   └── server.js       # Entry point
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application pages
│   │   ├── store/      # Zustand state store
│   │   └── ...
│   └── ...
├── package.json        # Root package configuration
└── README.md           # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
