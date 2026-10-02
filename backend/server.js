const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const file = "posts.json";

function getPosts() {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function savePosts(posts) {
  fs.writeFileSync(file, JSON.stringify(posts, null, 2));
}

app.get("/", (req, res) => {
  res.send("Blog Backend is working!");
});

app.get("/api/posts", (req, res) => {
  res.json(getPosts());
});

app.post("/api/posts", (req, res) => {
  const posts = getPosts();
  const post = { id: Date.now(), ...req.body };
  posts.push(post);
  savePosts(posts);
  res.json(post);
});

app.put("/api/posts/:id", (req, res) => {
  const posts = getPosts();
  const index = posts.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Post not found" });
  posts[index] = { ...posts[index], ...req.body };
  savePosts(posts);
  res.json(posts[index]);
});

app.delete("/api/posts/:id", (req, res) => {
  const posts = getPosts().filter(p => p.id != req.params.id);
  savePosts(posts);
  res.json({ message: "Post deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});