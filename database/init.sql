CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    position_title VARCHAR(255) NOT NULL,
    application_status VARCHAR(100) NOT NULL,
    application_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS learning_topics (
    id SERIAL PRIMARY KEY,
    topic_name VARCHAR(255) NOT NULL,
    status VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);