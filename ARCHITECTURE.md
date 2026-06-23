# CareerTrack Architecture

## Project Summary

CareerTrack is a 5-service Docker Compose application for tracking job applications and DevOps learning progress.

## Services

1. Frontend - user interface
2. Backend - API server
3. PostgreSQL - main database
4. Redis - cache storage
5. PgAdmin - database management UI

## Architecture Diagram

```text
User Browser
    |
    v
Frontend Container
    |
    v
Backend Container
    |
    |--------------------|
    v                    v
PostgreSQL Database     Redis Cache
    |
    v
PgAdmin

REQUEST FLOW
User opens the frontend.
Frontend sends request to backend.
Backend checks Redis for cached data.
If data is not in Redis, backend queries PostgreSQL.
Backend returns data to frontend.
PgAdmin is used to inspect PostgreSQL.

PURPOSE

This project demonstrates:

Docker Compose
Multi-container networking
PostgreSQL persistence
Redis caching
Backend API development
Frontend/backend communication
Database administration with PgAdmin