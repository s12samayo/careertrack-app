# CareerTrack Architecture

## Overview

CareerTrack is a containerized full-stack application that enables users to track job applications and monitor DevOps learning progress.

The application follows a multi-container architecture orchestrated with Docker Compose and deployed automatically to AWS EC2 using GitHub Actions.

---

# High-Level Architecture

```
                User
                  │
                  ▼
          Frontend (HTML/CSS/JS)
                  │
        HTTP REST API Requests
                  │
                  ▼
       Backend (Node.js + Express)
          │                   │
          │                   │
          ▼                   ▼
      Redis Cache      PostgreSQL Database
                              │
                              ▼
                      Persistent Volume
```

---

# Container Architecture

```
Docker Compose

├── Frontend
│      │
│      ▼
├── Backend
│      │
├──────┴─────────────┐
│                    │
▼                    ▼
Redis           PostgreSQL
                     │
                     ▼
                 PgAdmin
```

---

# CI/CD Architecture

```
Developer
      │
git push
      │
      ▼
GitHub Repository
      │
      ▼
GitHub Actions CI
      │
      ▼
Build Docker Images
      │
      ▼
Docker Hub
      │
      ▼
GitHub Actions Deploy
      │
      ▼
Self-hosted Runner
      │
      ▼
AWS EC2
      │
      ▼
Docker Compose
      │
      ▼
CareerTrack Application
```

---

# Backend Flow

```
Frontend
     │
     ▼
REST API
     │
     ▼
Express Routes
     │
     ▼
Redis Cache
     │
 Cache Miss
     ▼
PostgreSQL
     │
     ▼
Response Returned
```

---

# Database Initialization

The PostgreSQL database is initialized automatically during container startup using:

```
database/init.sql
```

This creates:

- jobs
- learning_topics

without requiring manual SQL execution.

---

# Technologies

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- PostgreSQL
- Redis
- Docker
- Docker Compose
- GitHub Actions
- Docker Hub
- AWS EC2

---

# Deployment Strategy

Continuous Integration

- Build images
- Push images to Docker Hub

Continuous Deployment

- Pull latest images
- Restart services
- Deploy automatically using Docker Compose

---

# Monitoring

Current

- Docker logs
- Docker ps
- Health verification

Future

- Prometheus
- Grafana
- Node Exporter