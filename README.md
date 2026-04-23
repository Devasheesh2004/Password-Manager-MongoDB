# Password Manager

A secure, intuitive, and beautifully designed full-stack Password Manager application. Keep all your website credentials neatly organized and securely stored in one place!

## 🌐 Live Demo
Check out the live application here: **[Password Manager Live](https://password-manager-mongodb-1.onrender.com/)**

## 🚀 Features
- **Store Credentials**: Easily save website URLs, usernames, and passwords.
- **Copy to Clipboard**: One-click copy functionality for your saved usernames, passwords, and website URLs.
- **Toggle Visibility**: Effortlessly show or hide your saved passwords for enhanced privacy.
- **Beautiful UI/UX**: Clean and responsive user interface powered by Tailwind CSS, with lively animations using Lottie and Lordicon.
- **Toast Notifications**: Real-time interactive feedback for user actions like saving, copying, or deleting a password.
- **Full-Stack Implementation**: Fully functional custom backend built with Node.js and Express connected to a MongoDB database.

## 🛠️ Tech Stack

### Frontend
- **React.js** (Bootstrapped with Vite for extremely fast HMR)
- **Tailwind CSS** (for styling and responsiveness)
- **Lordicon / Lottie-web** (for engaging dynamic animations)
- **React-Toastify** (for seamless toast notifications)

### Backend
- **Node.js & Express.js** (Server runtime and routing API)
- **MongoDB** (NoSQL Database for securely storing credentials via the native `mongodb` driver)
- **Cors & Body-Parser** (Middleware)
- **Dotenv** (Environment variable management)

## 💻 Running Locally

### Prerequisites
Make sure you have Node.js installed on your machine and a valid MongoDB cluster URI.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Devasheesh2004/Password-Manager-MongoDB.git
   cd "Password-Manager MongoDB"
   ```

2. **Frontend Setup:**
   - Install dependencies in the root directory:
     ```bash
     npm install
     ```
   - Configure the environment variable in the root `.env` file to point to your backend:
     ```env
     VITE_API_BASE_URL=http://localhost:3000
     ```
   - Start the Vite development server:
     ```bash
     npm run dev
     ```

3. **Backend Setup:**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install backend dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file inside the `backend` folder and add your MongoDB Connection String and Port:
     ```env
     MONGO_URL=your_mongodb_connection_string
     PORT=3000
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

## 📜 License
This project is open-source.
