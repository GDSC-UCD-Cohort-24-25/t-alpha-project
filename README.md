A full-stack application built with FastAPI (Backend) and Vite (Frontend).

## 🛠 Tech Stack

* **Backend:** Python, FastAPI
* **Frontend:** React (via Vite), Node.js
  
---

## 📥 Installation

### 1. Backend Setup
Open a terminal (Command Prompt or PowerShell) in the **root directory** to install Python dependencies.

```powershell
pip install -r requirements.txt
2. Frontend Setup
Navigate to the frontend folder to install JavaScript dependencies.

PowerShell

cd frontend
npm install
Note: If prompted regarding vulnerabilities, run npm audit fix to resolve security issues.

🚀 Running the Application
To run the full stack, open two separate terminal windows.

Terminal 1: Start the Backend
From the root directory, start the FastAPI server.

Option A: Using a batch script

PowerShell

# Run your startup script (e.g., run.bat)
run.bat
Option B: Manual Command

PowerShell

# Typical uvicorn command (adjust 'main:app' based on your file structure)
python -m uvicorn main:app --reload
Terminal 2: Start the Frontend
From the frontend directory, start the Vite development server.

PowerShell

cd frontend
npm run dev
The frontend should now be accessible (usually at http://localhost:5173) and communicating with your backend.


---

### Preview

# Project Name

A full-stack application built with FastAPI (Backend) and Vite (Frontend).

## 🛠 Tech Stack

* **Backend:** Python, FastAPI
* **Frontend:** React (via Vite), Node.js

## ⚙️ Prerequisites

Before getting started, ensure you have the following installed on Windows:
* [Python](https://www.python.org/downloads/windows/)
* [Node.js](https://nodejs.org/en/download/) & npm

---

## 📥 Installation

### 1. Backend Setup
Open a terminal (Command Prompt or PowerShell) in the **root directory** to install Python dependencies.

```powershell
pip install -r requirements.txt
2. Frontend Setup
Navigate to the frontend folder to install JavaScript dependencies.

PowerShell

cd frontend
npm install
Note: If prompted regarding vulnerabilities, run npm audit fix to resolve security issues.

🚀 Running the Application
To run the full stack, open two separate terminal windows.

Terminal 1: Start the Backend
From the root directory, start the FastAPI server.

Option A: Using a batch script

PowerShell

# Run your startup script (e.g., run.bat)
run.bat
Option B: Manual Command

PowerShell

# Typical uvicorn command (adjust 'main:app' based on your file structure)
python -m uvicorn main:app --reload
Terminal 2: Start the Frontend
From the frontend directory, start the Vite development server.

PowerShell

cd frontend
npm run dev
