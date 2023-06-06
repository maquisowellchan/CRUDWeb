import React, { useState, useEffect } from "react";
import "../../App.css";
import Modal from "react-modal";
import { Link} from "react-router-dom";

  const Dashboard = () => {

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    email: "",
    contactnumber: "",
  });


  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/enrollment");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

 

  const handleDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/enrollment/${id}`, {
        method: "DELETE",
      });

      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
    setFormData({
        firstname: student.firstname,
        lastname: student.lastname,
        age: student.age,
        gender: student.gender,
        email: student.email,
        contactnumber: student.contactnumber,
      });
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
    setFormData({
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        email: "",
        contactnumber: "",
      });
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/enrollment/${selectedStudent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Update was successful
        fetchStudents(); // Fetch the updated list of students
        handleCloseModal(); // Close the modal
      } else {
        // Handle error response
        console.log("Update failed");
      }
    } catch (error) {
      // Handle fetch error
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div style={{ backgroundColor: "#6a62d2" }}>
        <div className="tablecontainer">
          <div className="buttons-container">
            <button className="btn-add">
              <Link to="/addstudent">ADD</Link>
            </button>
            <button className="btn-logout"><Link to="/">LOGOUT</Link></button>
          </div>
          <table border={0}>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.firstname}</td>
                <td>{student.lastname}</td>
                <td>{student.age}</td>
                <td>{student.gender}</td>
                <td>{student.email}</td>
                <td>{student.contactnumber}</td>
                <td className="btn-container">
                  <button
                    className="btn_upd"
                    onClick={() => handleUpdate(student)}
                  >
                    Update
                  </button>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn_del"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      {selectedStudent && (
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} className="modal-container">
          <h2>Update Student</h2>
          <form onSubmit={handleSubmitUpdate}>
            <div style={{marginBottom:20}}>
              <label>First Name:</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
            <div style={{marginBottom:20}}>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
            <div style={{marginBottom:20}}>
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div style={{marginBottom:20}}>
              <label>Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div style={{marginBottom:20}}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div style={{marginBottom:20}}>
              <label>Contact Number:</label>
              <input
                type="tel"
                name="contactnumber"
                value={formData.contactnumber}
                onChange={handleChange}
              />
            </div>
            <div className="button-container">
              <button type="submit">Update</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Dashboard;
