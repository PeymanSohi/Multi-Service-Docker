const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(express.json());

// MongoDB schema and model
const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});
const Todo = mongoose.model("Todo", todoSchema);

// Connect to MongoDB
mongoose.connect("mongodb://mongo:27017/todoapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    completed: false,
  });
  await newTodo.save();
  res.json(newTodo);
});

app.get("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text, completed: req.body.completed },
    { new: true }
  );
  res.json(updatedTodo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
