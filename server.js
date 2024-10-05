const express = require('express');
const app = express();
const port = 3000;

let tasks = [];

app.use(express.json());
app.use(express.static('public'));

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.status(201).json(task);
});

app.delete('/tasks/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    tasks.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
