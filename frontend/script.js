async function handleAPIResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = (data && data.error) || response.statusText || "Request failed";
    throw new Error(message);
  }

  return data;
}

async function loadJobs() {
  try {
    const response = await fetch("http://localhost:5000/api/jobs");
    const jobs = await handleAPIResponse(response);

    const jobsDiv = document.getElementById("jobs");
    jobsDiv.innerHTML = "";

    if (!jobs.length) {
      jobsDiv.innerHTML = `<p class="empty-state">No job applications yet. Add one above to get started.</p>`;
      return;
    }

    jobs.forEach((job) => {
      jobsDiv.innerHTML += `
        <p>
          <span>
            <strong>${job.company_name}</strong> -
            ${job.position_title}
            (${job.application_status})
          </span>
          <button type="button" onclick="deleteJob(${job.id})">Delete</button>
        </p>
      `;
    });
  } catch (error) {
    showMessage("job-message", error.message || "Unable to load job applications.", "error");
  }
}

function showMessage(elementId, message, type = "success") {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.className = `message ${type}`;

  if (message) {
    setTimeout(() => {
      element.textContent = "";
      element.className = "message";
    }, 4000);
  }
}

async function loadLearningTopics() {
  try {
    const response = await fetch("http://localhost:5000/api/learning-topics");
    const topics = await handleAPIResponse(response);

    const topicsDiv = document.getElementById("learning-topics");
    topicsDiv.innerHTML = "";

    if (!topics.length) {
      topicsDiv.innerHTML = `<p class="empty-state">No learning topics yet. Add one above to begin.</p>`;
      return;
    }

    topics.forEach((topic) => {
      topicsDiv.innerHTML += `
        <p>
          <span>
            <strong>${topic.topic_name}</strong> -
            ${topic.status}
          </span>
          <button type="button" onclick="deleteLearningTopic(${topic.id})">
            Delete
          </button>
        </p>
      `;
    });
  } catch (error) {
    showMessage("topic-message", error.message || "Unable to load learning topics.", "error");
  }
}

async function addJob(event) {
  event.preventDefault();

  const companyName = document.getElementById("company-name").value.trim();
  const positionTitle = document.getElementById("position-title").value.trim();
  const applicationStatus = document
    .getElementById("application-status")
    .value.trim();

  if (!companyName || !positionTitle || !applicationStatus) {
    showMessage("job-message", "Please fill in every field.", "error");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_name: companyName,
        position_title: positionTitle,
        application_status: applicationStatus,
      }),
    });

    await handleAPIResponse(response);

    document.getElementById("add-job-form").reset();
    loadJobs();
    showMessage("job-message", "Job added successfully.", "success");
  } catch (error) {
    showMessage("job-message", error.message || "Failed to add job.", "error");
  }
}

async function addLearningTopic(event) {
  event.preventDefault();

  const topicName = document.getElementById("topic-name").value.trim();
  const topicStatus = document.getElementById("topic-status").value.trim();

  if (!topicName || !topicStatus) {
    showMessage("topic-message", "Please fill in every field.", "error");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/learning-topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic_name: topicName,
        status: topicStatus,
      }),
    });

    await handleAPIResponse(response);

    document.getElementById("add-topic-form").reset();
    loadLearningTopics();
    showMessage("topic-message", "Learning topic added successfully.", "success");
  } catch (error) {
    showMessage("topic-message", error.message || "Failed to add learning topic.", "error");
  }
}

async function deleteLearningTopic(id) {
  try {
    const response = await fetch(`http://localhost:5000/api/learning-topics/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    loadLearningTopics();
    showMessage("topic-message", "Topic deleted successfully.", "success");
  } catch (error) {
    showMessage("topic-message", "Failed to delete learning topic.", "error");
  }
}

async function deleteJob(id) {
  try {
    const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    loadJobs();
    showMessage("job-message", "Job deleted successfully.", "success");
  } catch (error) {
    showMessage("job-message", "Failed to delete job.", "error");
  }
}

document
  .getElementById("add-job-form")
  .addEventListener("submit", addJob);

document
  .getElementById("add-topic-form")
  .addEventListener("submit", addLearningTopic);

loadJobs();
loadLearningTopics();