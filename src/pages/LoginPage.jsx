import React from "react";
import alert from '../utilities/alert'
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function LoginPage() {
  const {setUserInfo} = React.useContext(UserContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      alert("error" ,"Username and password are required");
      return;
    } else if (password.length < 8) {
      alert("error" ,"Password must be at least 8 characters");
      return;
    } else if (username.length < 3) {
      alert("error" ,"Username must be at least 3 characters");
      return;
    } else if (username.length > 20) {
      alert("error" ,"Username must be less than 20 characters");
      return;
    }

    // API call to login
    fetch("https://fine-blue-shrimp-coat.cyclic.app/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })
      .then(res => {
        if (res.ok) {
          alert("success", "Login successfully")
          res.json().then(data => setUserInfo(data))
          setLoggedIn(true);
        } else {
          alert("error" ,"Invalid username or password");
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
