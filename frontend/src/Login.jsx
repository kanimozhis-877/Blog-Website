import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    alert("User login successful!");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">✦</div>

        <h1>Welcome Back</h1>

        <p>Login to continue to BlogSpace</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email address"
            spellCheck={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <div className="login-footer">
          Don't have an account? <span>Create Account</span>
        </div>
      </div>
    </div>
  );
}

export default Login;