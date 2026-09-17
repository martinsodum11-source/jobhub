# JobHub

JobHub is an open-source job board platform built to help people discover job opportunities and connect with companies.

The project focuses on simplicity, accessibility, real-world functionality, and a contributor-friendly development experience.

## Features

### Job Seekers

* 🔎 Search for jobs
* 🎯 Filter jobs by category, location, and job type
* 💾 Save jobs
* 📄 View detailed job information
* 📝 Apply for jobs
* 📋 Track submitted applications
* 🔐 Create an account and log in
* 📱 Responsive design

### Employers

* 🔐 Create an employer account
* ➕ Post new jobs
* ✏️ Edit jobs
* 🗑️ Delete jobs
* 📋 View applications for posted jobs
* 🔄 Update application statuses
* 🔒 Access controlled by user roles

### Backend & Security

* REST API built with Express
* MongoDB database with Mongoose
* JWT authentication
* Password hashing with bcrypt
* Role-based authorization
* Server-side job validation
* Duplicate application prevention
* Ownership checks for employer actions
* Automated middleware and validation tests

## Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* Vite
* JavaScript

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* bcryptjs

### Testing

* Node.js built-in test runner

## Project Structure

```text
jobhub/
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── api/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── server/
│   ├── data/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── tests/
│   ├── .env
│   ├── seed.js
│   ├── package.json
│   └── server.js
│
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── package.json
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* Git
* A MongoDB database

### 1. Clone the repository

```bash
git clone https://github.com/martinsodum11-source/jobhub.git
```

### 2. Move into the project

```bash
cd jobhub
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Install backend dependencies

```bash
cd server
npm install
```

### 5. Configure environment variables

Inside the `server` directory, create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Do not commit your `.env` file or expose your MongoDB credentials or JWT secret.

### 6. Start the backend

From the `server` directory:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 7. Start the frontend

Open another terminal and return to the project root:

```bash
cd jobhub
```

Then run:

```bash
npm run dev
```

Open the local URL shown in your terminal.

## API Overview

The JobHub backend provides endpoints for:

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Jobs

```text
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PUT    /api/jobs/:id
DELETE /api/jobs/:id
```

### Applications

```text
POST /api/applications
GET  /api/my-applications
GET  /api/employer/applications
PUT  /api/employer/applications/:id/status
```

Protected endpoints require a valid JWT authentication token.

## Testing

Backend tests are located in:

```text
server/tests/
```

Run the test suite from the `server` directory:

```bash
npm test
```

The current test suite covers authentication, role authorization, and job validation.

## Contributing

Contributions are welcome!

If you would like to contribute:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Run the tests
5. Make sure the project still works
6. Commit your changes
7. Open a pull request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before contributing.

When submitting a pull request, explain:

* What you changed
* Why you changed it
* How you tested it
* Any additional considerations for reviewers

## Roadmap

JobHub's core functionality is currently implemented.

Future improvements may include:

* 📎 Resume file uploads
* 📧 Email notifications
* 🔔 Application notifications
* 📊 Employer analytics
* 👤 Admin dashboard
* 🔎 Advanced job search
* 📨 Application status history
* 💬 Employer/job seeker messaging
* 🌐 Production deployment improvements
* 🧪 Expanded API integration tests
* 🐛 More contributor-friendly GitHub issues

New features should be discussed through GitHub issues before major implementation work begins.

## License

JobHub is released under the MIT License.

See [LICENSE](LICENSE) for more information.

