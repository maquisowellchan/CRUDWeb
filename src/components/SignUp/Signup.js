import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        role,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Registration Failed");
        }
      })
      .then((data) => {
        const { token } = data;
   
        alert("You have successfully registered!");
    
        if (role === "user") {
          navigate("/userdashboard");
        } else if (role === "admin") {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <div>
        <div className="maincontainer">
          <div className="logincontainer2">
            <h1>SIGN UP PAGE</h1>
            <div className="inside">
              <form onSubmit={handleRegister}>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstname}
                  style={{ marginBottom: 10 }}
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                  required
                />
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastname}
                  style={{ marginBottom: 10 }}
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Last Name"
                  required
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  style={{ marginBottom: 10 }}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  style={{ marginBottom: 50 }}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                />
                <div className="role-select-container">
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    required
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button type="submit">SIGN IN</button>
              </form>
              {error && <p>Error: {error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
