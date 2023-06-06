import React, { useState } from "react";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Invalid Credentials");
        }
      })
      .then((data) => {
        const { role } = data;
        
        if (role === "user") {
          navigate("/userdashboard");
        } else if (role === "admin") {
          navigate("/dashboard");
        } else {
          throw new Error("Invalid role");
        }
      })
      .catch((error) => {
        alert("Login Error: " + error.message);
      });
  };

  return (
    <>
      <div>
        <div className="maincontainer">
          <div className="logincontainer">
            <h1 style={{ marginTop: 10, fontSize: 20 }}>
              SIGN IN TO YOUR ACCOUNT
            </h1>
            <div className="inside">
              <form onSubmit={handleLogin}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: 20 }}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                />
                <br />
                <br />
                <button type="submit" className="btn_log">
                  LOGIN
                </button>
              </form>
              <hr className="horizontal-line" />
              <button className="btn_log">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/signup"
                >
                  SIGN UP
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
