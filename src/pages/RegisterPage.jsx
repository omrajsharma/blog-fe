import React from "react";
import alert from "../utilities/alert";

function RegisterPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = () => {
    // Validation
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

    // API call to register
    fetch('http://localhost:3000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    })
    .then(res => {
      if (res.ok) {
        alert("success", "User Registered Successfully");
      } else {
        alert("error", "User Registration Failed");
      }
    })


    setUsername("");
    setPassword("");
  };

  return (
    <div className="register">
      <div className="register-container">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default RegisterPage;
