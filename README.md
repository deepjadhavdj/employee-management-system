# MERN Employee Management System

## Project Overview
This project is an Employee Management System built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is designed to evaluate frontend implementation concepts and features during the MERN evaluation.

The system allows managers or admins to manage employee records, providing a seamless user interface for creating, reading, updating, and deleting (CRUD) employee data.

<div align="center">
  <img src="./frontend/public/vite.svg" alt="Project Logo" width="100"/>
</div>

## Features Implemented

### Frontend (React + Vite + Tailwind CSS + DaisyUI)
- **Employee Listing (`EmployeeList.jsx`)**: Displays all current employees in a grid layout using interactive `EmployeeCard` components.
- **Add Employee (`AddEmployee.jsx`)**: A form to onboard new employees with automatic or read-only ID generation (as discussed in project approvals).
- **Edit Employee (`EditEmployee.jsx`)**: Allows updating existing employee records such as name, email, department, and status.
- **Status & Department Filtering**: Capable of filtering the employee list by active, inactive, or resigned status, as well as by department.
- **Responsive UI**: Designed with Tailwind CSS and DaisyUI for a modern, responsive user experience across devices.
- **Toast Notifications**: Interactive feedback using `react-hot-toast` for successful operations and errors.
- **Not Found Page (`EmployeeNotFound.jsx`)**: Handling for invalid routes or missing employee data.

### Backend (Node.js + Express + MongoDB)
- **RESTful API (`employeeController.js`)**: Robust API endpoints handling CRUD operations:
  - `GET /api/employees`: Retrieve all employees sorted by creation date.
  - `POST /api/employees`: Create a new user with duplicate ID and email validations.
  - `GET /api/employees/:id`: Retrieve a single employee by their auto-generated MongoDB ID.
  - `PUT /api/employees/:id`: Update employee records.
  - `DELETE /api/employees/:id`: Delete an employee from the database.
- **Mongoose ODM**: Handles database schema validations seamlessly.
- **CORS & Environment Variables**: Configured securely using `cors` and `dotenv`.

## Project Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed or a MongoDB Atlas connection string

### 1. Clone the repository
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd Employee
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the `backend` folder and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Deployment Instructions (Render.com)

### Backend Deployment
1. Go to [Render.com](https://render.com/) and create a new **Web Service**.
2. Connect your GitHub repository.
3. Set the **Root Directory** to `backend`.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add your `.env` variables (e.g., `MONGO_URI`, `PORT`) in the Render environment variables section.

### Frontend Deployment
1. Create a new **Static Site** on Render.
2. Connect the same GitHub repository.
3. Set the **Root Directory** to `frontend`.
4. Build Command: `npm run build`
5. Publish Directory: `dist`
6. Add an environment variable `VITE_API_URL` pointing to your deployed backend URL.
   *(Make sure your frontend API calls use `import.meta.env.VITE_API_URL` or are adjusted configured for production.)*

---
*Developed for MERN Stack Frontend Evaluation.*
