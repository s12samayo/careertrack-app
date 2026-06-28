const API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:5000`;

let editingJobId = null;
let editingTopicId = null;

function getElement(id) {
  return document.getElementById(id);
}

async function handleAPIResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = (data && data.error) || response.statusText || "Request failed";
    throw new Error(message);
  }

  return data;
}

function showMessage(elementId, message, type = "success") {
  const element = getElement(elementId);
  element.textContent = message;
  element.className = `message ${type}`;

  if (message) {
    setTimeout(() => {
      element.textContent = "";
      element.className = "message";
    }, 4000);
  }
}

function resetJobForm() {
  getElement("add-job-form").reset();
  editingJobId = null;
  document.querySelector("#add-job-form button").textContent = "Add Job";
}

function resetTopicForm() {
  getElement("add-topic-form").reset();
  editingTopicId = null;
  document.querySelector("#add-topic-form button").textContent = "Add Topic";
}

function createButton(label, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function renderEmptyState(container, message) {
  const emptyState = document.createElement("p");
  emptyState.className = "empty-state";
  emptyState.textContent = message;
  container.appendChild(emptyState);
}

function renderJob(job) {
  const row = document.createElement("p");

  const details = document.createElement("span");
  const company = document.createElement("strong");
  company.textContent = job.company_name;

  details.append(
    company,
    ` - ${job.position_title} (${job.application_status})`
  );

  row.append(
    details,
    createButton("Edit", () => startEditJob(job)),
    createButton("Delete", () => deleteJob(job.id))
  );

  return row;
}

function renderLearningTopic(topic) {
  const row = document.createElement("p");

  const details = document.createElement("span");
  const topicName = document.createElement("strong");
  topicName.textContent = topic.topic_name;

  details.append(topicName, ` - ${topic.status}`);

  row.append(
    details,
    createButton("Edit", () => startEditLearningTopic(topic)),
    createButton("Delete", () => deleteLearningTopic(topic.id))
  );

  return row;
}

async function loadJobs() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/jobs`);
    const jobs = await handleAPIResponse(response);

    const jobsDiv = getElement("jobs");
    jobsDiv.replaceChildren();

    if (!jobs.length) {
      renderEmptyState(
        jobsDiv,
        "No job applications yet. Add one above to get started."
      );
      return;
    }

    jobs.forEach((job) => {
      jobsDiv.appendChild(renderJob(job));
    });
  } catch (error) {
    showMessage(
      "job-message",
      error.message || "Unable to load job applications.",
      "error"
    );
  }
}

async function loadLearningTopics() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/learning-topics`);
    const topics = await handleAPIResponse(response);

    const topicsDiv = getElement("learning-topics");
    topicsDiv.replaceChildren();

    if (!topics.length) {
      renderEmptyState(topicsDiv, "No learning topics yet. Add one above to begin.");
      return;
    }

    topics.forEach((topic) => {
      topicsDiv.appendChild(renderLearningTopic(topic));
    });
  } catch (error) {
    showMessage(
      "topic-message",
      error.message || "Unable to load learning topics.",
      "error"
    );
  }
}

function startEditJob(job) {
  editingJobId = job.id;

  getElement("company-name").value = job.company_name;
  getElement("position-title").value = job.position_title;
  getElement("application-status").value = job.application_status;

  document.querySelector("#add-job-form button").textContent = "Update Job";
}

function startEditLearningTopic(topic) {
  editingTopicId = topic.id;

  getElement("topic-name").value = topic.topic_name;
  getElement("topic-status").value = topic.status;

  document.querySelector("#add-topic-form button").textContent = "Update Topic";
}

async function addJob(event) {
  event.preventDefault();

  const companyName = getElement("company-name").value.trim();
  const positionTitle = getElement("position-title").value.trim();
  const applicationStatus = getElement("application-status").value.trim();

  if (!companyName || !positionTitle || !applicationStatus) {
    showMessage("job-message", "Please fill in every field.", "error");
    return;
  }

  const isEditing = Boolean(editingJobId);
  const url = isEditing
    ? `${API_BASE_URL}/api/jobs/${editingJobId}`
    : `${API_BASE_URL}/api/jobs`;

  try {
    const response = await fetch(url, {
      method: isEditing ? "PUT" : "POST",
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

    resetJobForm();
    await loadJobs();

    showMessage(
      "job-message",
      isEditing ? "Job updated successfully." : "Job added successfully.",
      "success"
    );
  } catch (error) {
    showMessage("job-message", error.message || "Failed to save job.", "error");
  }
}

async function addLearningTopic(event) {
  event.preventDefault();

  const topicName = getElement("topic-name").value.trim();
  const topicStatus = getElement("topic-status").value.trim();

  if (!topicName || !topicStatus) {
    showMessage("topic-message", "Please fill in every field.", "error");
    return;
  }

  const isEditing = Boolean(editingTopicId);
  const url = isEditing
    ? `${API_BASE_URL}/api/learning-topics/${editingTopicId}`
    : `${API_BASE_URL}/api/learning-topics`;

  try {
    const response = await fetch(url, {
      method: isEditing ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic_name: topicName,
        status: topicStatus,
      }),
    });

    await handleAPIResponse(response);

    resetTopicForm();
    await loadLearningTopics();

    showMessage(
      "topic-message",
      isEditing
        ? "Learning topic updated successfully."
        : "Learning topic added successfully.",
      "success"
    );
  } catch (error) {
    showMessage(
      "topic-message",
      error.message || "Failed to save learning topic.",
      "error"
    );
  }
}

async function deleteLearningTopic(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/learning-topics/${id}`, {
      method: "DELETE",
    });

    await handleAPIResponse(response);

    if (editingTopicId === id) {
      resetTopicForm();
    }

    await loadLearningTopics();
    showMessage("topic-message", "Topic deleted successfully.", "success");
  } catch (error) {
    showMessage(
      "topic-message",
      error.message || "Failed to delete learning topic.",
      "error"
    );
  }
}

async function deleteJob(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/jobs/${id}`, {
      method: "DELETE",
    });

    await handleAPIResponse(response);

    if (editingJobId === id) {
      resetJobForm();
    }

    await loadJobs();
    showMessage("job-message", "Job deleted successfully.", "success");
  } catch (error) {
    showMessage("job-message", error.message || "Failed to delete job.", "error");
  }
}

getElement("add-job-form").addEventListener("submit", addJob);
getElement("add-topic-form").addEventListener("submit", addLearningTopic);

loadJobs();
loadLearningTopics();
