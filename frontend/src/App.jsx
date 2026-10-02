import { useState } from "react";
import "./App.css";
import Login from "./Login";
const API_URL = "http://localhost:5000/api/posts";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My Journey Into Technology",
      content:
        "Every new skill starts with a small step. This is my journey of learning, building and growing.",
      author: "Kanimozhi",
      comments: ["Amazing journey!", "Keep learning!"],
    },
    {
      id: 2,
      title: "5 Simple Habits for Better Learning",
      content:
        "Small daily habits can make learning easier, more consistent and more enjoyable.",
      author: "BlogSpace",
      comments: ["Very useful tips!"],
    },
    {
      id: 3,
      title: "Why Building Projects Matters",
      content:
        "Projects help us turn what we learn into something real and useful.",
      author: "BlogSpace",
      comments: [],
    },
  ]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const [comment, setComment] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const openCreateForm = () => {
    setTitle("");
    setContent("");
    setAuthor("");
    setEditingId(null);
    setShowForm(true);
  };

  const savePost = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !author.trim()) {
      alert("Please fill all fields.");
      return;
    }

    if (editingId) {
      setPosts(
        posts.map((post) =>
          post.id === editingId
            ? {
                ...post,
                title,
                content,
                author,
              }
            : post
        )
      );
    } else {
      const newPost = {
        id: Date.now(),
        title,
        content,
        author,
        comments: [],
      };

      fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(newPost)
})
.then(response => response.json())
.then(data => {
  setPosts([data, ...posts]);
})
.catch(error => console.log(error));
    }

    setTitle("");
    setContent("");
    setAuthor("");
    setEditingId(null);
    setShowForm(false);
  };

  const editPost = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setAuthor(post.author);
    setEditingId(post.id);
    setShowForm(true);
    setSelectedPost(null);
  };

  const deletePost = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmDelete) {
      setPosts(posts.filter((post) => post.id !== id));
      setSelectedPost(null);
    }
  };

  const addComment = (e) => {
    e.preventDefault();

    if (!comment.trim() || !selectedPost) {
      return;
    }

    const updatedPost = {
      ...selectedPost,
      comments: [...selectedPost.comments, comment],
    };

    setPosts(
      posts.map((post) =>
        post.id === selectedPost.id ? updatedPost : post
      )
    );

    setSelectedPost(updatedPost);
    setComment("");
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">✦ BlogSpace</div>

        <div className="nav-links">
          <button>Home</button>
          <button>Explore</button>

          <button onClick={openCreateForm}>Write</button>

          <button onClick={() => setShowLogin(true)}>Login</button>
          <button
  className="register-btn"
  onClick={() => setShowRegister(true)}
>
  Create Account
</button>

        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div>
          <p className="small-title">WELCOME TO BLOGSPACE</p>

          <h1>
            Share your thoughts.
            <br />
            <span>Inspire someone.</span>
          </h1>

          <p className="hero-text">
            A simple space to write, discover and connect through ideas.
          </p>

          <button className="primary-btn" onClick={openCreateForm}>
            ✍ Create a Post
          </button>
        </div>

        <div className="hero-card">
          <div className="sparkle">✦</div>

          <h3>Today's Inspiration</h3>

          <p>
            “Your ideas don't have to be perfect. They just need to be shared.”
          </p>
        </div>
      </section>

      {/* BLOG POSTS */}
      <section className="blog-section">
        <div className="section-heading">
          <div>
            <p className="small-title">DISCOVER</p>
            <h2>Fresh from the community</h2>
          </div>

          <button className="view-btn">View All →</button>
        </div>

        <div className="post-grid">
          {posts.map((post) => (
            <article className="post-card" key={post.id}>
              <div className="post-icon">✦</div>

              <p className="post-category">FEATURED STORY</p>

              <h3>{post.title}</h3>

              <p className="post-content">{post.content}</p>

              <div className="post-footer">
                <span>By {post.author}</span>

                <span>💬 {post.comments.length}</span>
              </div>

              <div className="card-actions">
                <button
                  className="read-btn"
                  onClick={() => {
                    setSelectedPost(post);
                    setComment("");
                  }}
                >
                  Read More →
                </button>

                <button
                  className="edit-btn"
                  onClick={() => editPost(post)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CREATE / EDIT FORM */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            <p className="small-title">
              {editingId ? "EDIT POST" : "CREATE POST"}
            </p>

            <h2>
              {editingId ? "Update your story" : "Write something beautiful"}
            </h2>

            <form onSubmit={savePost} className="post-form">
              <input
                type="text"
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="Your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />

              <textarea
                placeholder="Write your story..."
                rows="6"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <button type="submit" className="primary-btn">
                {editingId ? "Update Post" : "Publish Post"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* POST + COMMENTS */}
      {selectedPost && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setSelectedPost(null)}
            >
              ×
            </button>

            <p className="small-title">BLOG POST</p>

            <h2>{selectedPost.title}</h2>

            <p className="full-post">
              {selectedPost.content}
            </p>

            <p className="author">
              Written by {selectedPost.author}
            </p>

            <div className="comments-section">
              <h3>
                💬 Comments ({selectedPost.comments.length})
              </h3>

              {selectedPost.comments.length === 0 ? (
                <p className="no-comments">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                <div className="comments-list">
                  {selectedPost.comments.map((item, index) => (
                    <div className="comment" key={index}>
                      {item}
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={addComment} className="comment-form">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <button type="submit">Post</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {showLogin && (
  <div className="modal">
    <div className="modal-content">
      <button
        className="close-btn"
        onClick={() => setShowLogin(false)}
      >
        ×
      </button>

      <Login />
    </div>
  </div>
)}
{showRegister && (
  <div className="modal">
    <div className="modal-content">
      <button
        className="close-btn"
        onClick={() => setShowRegister(false)}
      >
        ×
      </button>

      <div className="login-card">
        <div className="login-icon">✦</div>

        <h1>Create Account</h1>

        <p>Join the BlogSpace community</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Account created successfully!");
            setShowRegister(false);
          }}
        >
          <input
            type="text"
            placeholder="Your name"
            required
          />

          <input
            type="email"
            placeholder="Email address"
            required
          />

          <input
            type="password"
            placeholder="Create password"
            required
          />

          <button type="submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default App;