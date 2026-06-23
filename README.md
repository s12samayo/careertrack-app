# CareerTrack

## Overview

CareerTrack is a containerized web application designed to help users track job applications and monitor their DevOps learning progress.

The application uses a multi-container architecture powered by Docker Compose and demonstrates backend API development, PostgreSQL database management, Redis caching, and frontend-to-backend communication.

---

## Features

### Job Management

* Add job applications
* View job applications
* Delete job applications

### Learning Topic Management

* Add learning topics
* View learning topics
* Delete learning topics

### Infrastructure Features

* Docker Compose orchestration
* PostgreSQL database persistence
* Redis caching
* PgAdmin database management
* Multi-container networking

---

## Technology Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL 16

### Cache

* Redis 7

### Containerization

* Docker
* Docker Compose

---

## Project Structure

```text
careertrack_project/
├── backend
├── frontend
├── docker-compose.yml
├── README.md
└── ARCHITECTURE.md
```

## Services

| Service    | Purpose             |
| ---------- | ------------------- |
| Frontend   | User Interface      |
| Backend    | API Server          |
| PostgreSQL | Main Database       |
| Redis      | Cache Storage       |
| PgAdmin    | Database Management |

---

## API Endpoints

### Jobs

```http
GET /api/jobs
POST /api/jobs
DELETE /api/jobs/:id
```

### Learning Topics

```http
GET /api/learning-topics
POST /api/learning-topics
DELETE /api/learning-topics/:id
```

---

## Learning Outcomes

This project helped develop skills in:

* Docker
* Docker Compose
* PostgreSQL
* Redis
* REST APIs
* Frontend Integration
* Backend Development
* Troubleshooting
* Root Cause Analysis
* DevOps Ticket Documentation

---

## Future Enhancements

* Update functionality
* GitHub Actions CI/CD
* Docker Hub Integration
* AWS Deployment
* Prometheus Monitoring
* Grafana Dashboards
