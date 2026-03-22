# Subscription Manager — Frontend

Frontend web application for managing user subscriptions.

This project is built with **React and Vite** and communicates with the backend REST API.

---

# Tech Stack

* React
* Vite
* Axios
* React Toastify

---

# Project Structure

frontend
├ src
│ ├ components
│ │ ├ SubscriptionTable.jsx
│ │ ├ SubscriptionFormModal.jsx
│ │ ├ EditSubscriptionModal.jsx
│ │ └ DeleteModal.jsx
│ │
│ ├ services
│ │ └ api.js
│ │
│ ├ App.jsx
│ └ main.jsx
│
├ package.json
└ README.md

---

# Features

* View all subscriptions
* Add new subscription
* Edit subscription
* Delete subscription
* Remaining days calculation
* Toast notifications

---

# Prerequisites

Make sure the **backend server is running**.

Backend must run at:

http://localhost:5000

---

# Setup Instructions

## 1. Clone Repository
```bash
git clone <frontend-repo-url>
cd frontend
```
---

## 2. Install Dependencies
```bash
npm install
```
---

## 3. Start Development Server
```bash
npm run dev
```
---

## 4. Open Application

Open in browser:

http://localhost:5173

---

# Application Workflow

User actions in the UI trigger API requests to the backend.

Example flow:

User creates subscription
↓
Frontend sends POST request
↓
Backend saves data in PostgreSQL
↓
Frontend refreshes subscription list

---

# Backend Requirement

This frontend expects the backend API to run at:

http://localhost:5000/api

---

# Example UI Actions

Add Subscription
Edit Subscription
Delete Subscription
View Remaining Days

---

# Notes

* Make sure the backend is running before starting the frontend.
* If backend port changes, update `src/services/api.js`.

---

# License

This project is for educational purposes.
