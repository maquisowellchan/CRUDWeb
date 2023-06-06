import React, { useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    email: "",
    contactnumber: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/enrollment/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="maincontainer">
        <div className="logincontainer3">
          <h1>ADD USER</h1>
          <br />
          <div className="inside">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
              ></input>
              <br />
              <br />
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
              ></input>
              <br />
              <br />
              <input
                type="text"
                name="age"
                id="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
              ></input>
              <br />
              <br />
              <input
                type="text"
                name="gender"
                id="gender"
                placeholder="Gender"
                value={formData.gender}
                onChange={handleChange}
                required
              ></input>
              <br />
              <br />
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              ></input>
              <br />
              <br />
              <input
                type="text"
                name="contactnumber"
                id="contactnumber"
                placeholder="Contact Number"
                value={formData.contactnumber}
                onChange={handleChange}
                required
              ></input>
              <br />
              <br />
              <button type="submit" className="btn_reg">
                ADD
              </button>
            </form>
          </div>
          {showModal && (
            <div className="modal">
              <p>You successfully added a student!</p>
              <button><Link to="/dashboard" className="btn_reg">
                To Dashboard
              </Link></button>
              
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddStudent;
