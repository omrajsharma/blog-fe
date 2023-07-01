import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function LoginPage() {
  const {setUserInfo} = React.useContext(UserContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      alert("Username and password are required");
      return;
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    } else if (username.length < 3) {
      alert("Username must be at least 3 characters");
      return;
    } else if (username.length > 20) {
      alert("Username must be less than 20 characters");
      return;
    }

    // API call to login
    fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })
      .then(res => {
        if (res.ok) {
          res.json().then(data => setUserInfo(data))
          setLoggedIn(true);
        } else {
          alert("Invalid username or password");
        }
      })

    setUsername("");
    setPassword("");
  }

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <input 
          type="text" 
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
        >Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
