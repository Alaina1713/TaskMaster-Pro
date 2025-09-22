const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const TASKS_FILE = './backend/tasks.json';

// Helper functions
function readTasks() {
    const data = fs.readFileSync(TASKS_FILE);
    return JSON.parse(data);
}

function writeTasks(tasks) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// API endpoints
app.get('/tasks', (req, res) => {
    res.json(readTasks());
});

app.post('/tasks', (req, res) => {
    const tasks = readTasks();
    const { task } = req.body;
    if(task) {
        tasks.push(task);
        writeTasks(tasks);
        res.status(201).json({ message: 'Task added', tasks });
    } else {
        res.status(400).json({ message: 'Invalid task' });
    }
});

app.delete('/tasks/:index', (req, res) => {
    const tasks = readTasks();
    const idx = parseInt(req.params.index);
    if(idx >= 0 && idx < tasks.length) {
        tasks.splice(idx, 1);
        writeTasks(tasks);
        res.json({ message: 'Task deleted', tasks });
    } else {
        res.status(400).json({ message: 'Invalid index' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
