const API_URL = "http://localhost:5000/tasks";

async function fetchTasks() {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderTasks(data);
}

async function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();
    if(!task) return;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
    });
    input.value = "";
    fetchTasks();
}

async function deleteTask(index) {
    await fetch(`${API_URL}/${index}`, { method: "DELETE" });
    fetchTasks();
}

function renderTasks(tasks) {
    const ul = document.getElementById("taskList");
    ul.innerHTML = "";
    tasks.forEach((task, idx) => {
        const li = document.createElement("li");
        li.textContent = task;

        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.onclick = () => deleteTask(idx);

        li.appendChild(btn);
        ul.appendChild(li);
    });
}

// Initial load
fetchTasks();
