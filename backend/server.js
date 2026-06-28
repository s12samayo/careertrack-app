const express = require("express");
const cors = require("cors");
const pool = require("./db");
const redisClient = require("./redisClient");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

function isValidId(id) {
  return Number.isInteger(Number(id)) && Number(id) > 0;
}

function cleanRequiredFields(fields) {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : "",
    ])
  );
}

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CareerTrack API",
  });
});

app.get("/api/jobs", async (req, res) => {
  try {
    const cachedJobs = await redisClient.get("jobs");

    if (cachedJobs) {
      console.log("Jobs returned from Redis cache");
      return res.json(JSON.parse(cachedJobs));
    }

    const result = await pool.query(
      "SELECT * FROM jobs ORDER BY created_at DESC"
    );

    await redisClient.setEx("jobs", 60, JSON.stringify(result.rows));

    console.log("Jobs returned from PostgreSQL and saved to Redis");

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch jobs",
    });
  }
});

app.post("/api/jobs", async (req, res) => {
  try {
    const { company_name, position_title, application_status } =
      cleanRequiredFields(req.body);

    if (!company_name || !position_title || !application_status) {
      return res.status(400).json({
        error: "company_name, position_title, and application_status are required",
      });
    }

    const result = await pool.query(
      "INSERT INTO jobs (company_name, position_title, application_status, application_date) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [company_name, position_title, application_status]
    );

    await redisClient.del("jobs");

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create job",
    });
  }
});

app.get("/api/learning-topics", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM learning_topics ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch learning topics",
    });
  }
});

app.post("/api/learning-topics", async (req, res) => {
  try {
    const { topic_name, status } = cleanRequiredFields(req.body);

    if (!topic_name || !status) {
      return res.status(400).json({
        error: "topic_name and status are required",
      });
    }

    const result = await pool.query(
      "INSERT INTO learning_topics (topic_name, status) VALUES ($1, $2) RETURNING *",
      [topic_name, status]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create learning topic",
    });
  }
});

app.delete("/api/learning-topics/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        error: "Valid learning topic id is required",
      });
    }

    const result = await pool.query("DELETE FROM learning_topics WHERE id = $1", [
      id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Learning topic not found",
      });
    }

    res.json({
      message: "Learning topic deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete learning topic",
    });
  }
});

app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        error: "Valid job id is required",
      });
    }

    const result = await pool.query("DELETE FROM jobs WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    await redisClient.del("jobs");

    res.json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete job",
    });
  }
});

app.put("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { company_name, position_title, application_status } =
      cleanRequiredFields(req.body);

    if (!isValidId(id)) {
      return res.status(400).json({
        error: "Valid job id is required",
      });
    }

    if (!company_name || !position_title || !application_status) {
      return res.status(400).json({
        error: "company_name, position_title, and application_status are required",
      });
    }

    const result = await pool.query(
      `UPDATE jobs
       SET company_name = $1,
           position_title = $2,
           application_status = $3
       WHERE id = $4
       RETURNING *`,
      [company_name, position_title, application_status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    await redisClient.del("jobs");

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update job",
    });
  }
});

app.put("/api/learning-topics/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { topic_name, status } = cleanRequiredFields(req.body);

    if (!isValidId(id)) {
      return res.status(400).json({
        error: "Valid learning topic id is required",
      });
    }

    if (!topic_name || !status) {
      return res.status(400).json({
        error: "topic_name and status are required",
      });
    }

    const result = await pool.query(
      `UPDATE learning_topics
       SET topic_name = $1,
           status = $2
       WHERE id = $3
       RETURNING *`,
      [topic_name, status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Learning topic not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update learning topic",
    });
  }
});

async function startServer() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
