# BUILD-A-CHROME-EXTENSION-FOR-PRODUCTIVITY-MANAGEMENT

COMPANY : CODTECH IT SOLUTIONS

NAME  : PULKIT SIKARWAR

INTERN ID  :CT08DF482

DOMAIN  : MERN STACK WEB DEVELOPMENT

DURATION :8 WEEKS

MENTOR : NEELA SANTOSH

## DESCRIPTION OF TASK

Objective:
The goal of Task 4 was to build a Chrome extension that functions as a productivity tracker, helping users monitor the time spent on websites, block distracting sites, and generate daily productivity reports. The extension is integrated with a MERN stack backend to store user data, logs, and analytics, and supports cross-device syncing using MongoDB.

🛠️ Tech Stack

MongoDB – Stores user activity logs, domain usage, and report data.

Express.js – Handles API requests from the Chrome extension.

React.js – Used in the popup UI of the extension.

Node.js – Backend runtime for executing server logic.

Chrome Extension APIs – Used for tracking browser tabs, monitoring URLs, and interacting with background scripts.

Socket.IO (Optional) – Can be used for real-time updates or sync features.

📁 Project Structure

pgsql
Copy
Edit
Task-4-Productivity-Extension/
├── extension/
│   ├── manifest.json         # Extension configuration
│   ├── background.js         # Background tracking logic
│   ├── popup.jsx             # React-based UI
│   ├── editor.css / assets/  # Styles and icons
├── backend/
│   ├── server.js             # Express server
│   ├── models/Log.js         # MongoDB schema for user activity
└── README.md
🔑 Features Implemented

✅ Time Tracker
Monitors how long a user stays on a particular domain.

Records domain name, start time, end time, and total duration.

✅ Distraction Blocker
Predefined or user-added list of distracting sites (like YouTube, Instagram).

Automatically blocks or warns users when visiting these sites.

✅ Activity Logger
Sends tracked data from the extension (background.js) to backend via API:

js
Copy
Edit
fetch("http://localhost:5000/api/log", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ domain, start, end, duration, userId })
});
✅ Reports & Summary

A /api/report/:userId endpoint aggregates time spent per site.

Users receive a summary of productivity, most visited sites, and usage duration.

🧪 How to Run & Test
1️⃣ Backend Setup
bash

cd backend
npm install
node server.js
2️⃣ Load Extension

Go to chrome://extensions

Enable "Developer Mode"

Click Load unpacked → Select /extension folder

Make sure manifest.json and icons are present

3️⃣ Start Using
Visit different websites

Open the extension popup to view active time

Use MongoDB Compass or /api/report/:userId to see logs and analytics

📊 MongoDB Report Example
Example output from /api/report/user123:

json
Copy
Edit
{
  "userId": "user123",
  "generatedAt": "2025-08-05T10:00:00Z",
  "summary": [
    { "domain": "www.google.com", "totalTime": 1200, "visits": 3 },
    { "domain": "www.youtube.com", "totalTime": 800, "visits": 2 }
  ]
}
🧠 Learning Outcomes
Built a Chrome extension using React and background scripts

Gained experience with Chrome APIs like tabs, runtime, and storage

Implemented data syncing between a browser extension and a Node.js backend

Practiced MongoDB aggregation for analytics

