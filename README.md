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


## DevOps Features

* GitHub Actions Continuous Integration (CI)
* Docker Hub Image Publishing
* AWS EC2 Deployment
* GitHub Actions Self-Hosted Runner
* Automated Continuous Deployment (CD)
* PostgreSQL Database Initialization Automation
* Production Docker Compose Deployment
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
├── database
│   └── init.sql
├── .github
│   └── workflows
│       ├── careertrack-ci.yml
│       └── careertrack-deploy.yml
├── docker-compose.yml
├── docker-compose.prod.yml
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
## CI/CD Pipeline

The CareerTrack application uses GitHub Actions to automate software delivery.

### Continuous Integration

1. Developer pushes code to GitHub.
2. GitHub Actions builds backend and frontend Docker images.
3. Images are pushed to Docker Hub.

### Continuous Deployment

1. Successful CI pipeline triggers the deployment workflow.
2. Self-hosted GitHub Actions runner on AWS EC2 receives the deployment job.
3. Latest images are pulled from Docker Hub.
4. Docker Compose updates the running application automatically.

### Deployment Flow

Developer
→ GitHub
→ GitHub Actions CI
→ Docker Hub
→ GitHub Actions Deploy
→ Self-Hosted Runner (EC2)
→ Docker Compose
→ CareerTrack Application
---

## AWS Deployment

CareerTrack is deployed on AWS EC2 using Docker Compose.

Services deployed:

* Frontend
* Backend
* PostgreSQL
* Redis
* PgAdmin

The deployment is fully automated through GitHub Actions and a self-hosted runner.

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
* GitHub Actions
* Docker Hub
* AWS EC2
* Self-Hosted Runners
* Continuous Integration (CI)
* Continuous Deployment (CD)
* PostgreSQL Initialization Scripts
* Production Deployment
---

## Future Enhancements

* ## Future Enhancements

* Update/Edit functionality (Complete CRUD)
* Prometheus Monitoring
* Grafana Dashboards
* Application Health Checks
* Nginx Reverse Proxy
* HTTPS with SSL Certificates
* Custom Domain Name
* Kubernetes Deployment