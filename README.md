# Ethara Task Manager

A simple full-stack task manager application built with React, Node.js, Express, and MongoDB.

## Features
- User Authentication (Signup/Login) with JWT.
- Role-based Access Control (Admin / Member).
- Admins can create projects and tasks, and assign them to members.
- Members can view tasks assigned to them and update their status.
- Dashboard with statistics (Total, Completed, Pending, Overdue tasks).

## Folder Structure
- `backend/`: Node.js Express API.
- `frontend/`: React application built with Vite and Tailwind CSS.

## Requirements
- Node.js (v18+)
- MongoDB (running locally or a cloud instance)

## Getting Started

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - The `.env` file is already created with default values.
   - You can update `MONGO_URI` if your MongoDB is hosted elsewhere.
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

### 2. Frontend Setup
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
   The frontend will run on `http://localhost:5173`.

### 3. Usage
- Go to `http://localhost:5173`.
- Sign up as an **admin** user (select 'Admin' in the role dropdown).
- Create some members (Sign up as 'Member').
- Log in as admin to create projects, assign members to projects, create tasks, and assign tasks to users.
- Log in as a member to see assigned tasks and change their statuses.

## Deployment (Railway)
This project is structured as a monorepo with separate `backend` and `frontend` folders. 
To deploy on Railway:
1. Create a new project in Railway.
2. Deploy from your GitHub repository.
3. Railway will ask you to select the root directory. You can create two separate services in Railway:
   - **Service 1 (Backend)**: Set root directory to `/backend`. Add `MONGO_URI` and `JWT_SECRET` as environment variables.
   - **Service 2 (Frontend)**: Set root directory to `/frontend`. Railway will automatically build and deploy the Vite app. Add `VITE_API_URL` pointing to the backend service URL.
   
Alternatively, to serve frontend from backend:
1. Build frontend: `cd frontend && npm run build`
2. Move `frontend/dist` to `backend/public`.
3. Update `backend/server.js` to serve static files from `public` and fallback to `index.html`.
4. Deploy the `backend` folder as the root.
