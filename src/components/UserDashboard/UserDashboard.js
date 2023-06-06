import React, { useState, useEffect } from "react";
import "../../App.css";
import Modal from "react-modal";
import { Link } from "react-router-dom";


const UserDashboard = () => {

    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);


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

      

    return (
        <>
        <div style={{backgroundColor: "#6a62d2"}}>
            <div className="tablecontainer">
                <div className="buttons-container">
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
                    </tr>
                    {students.map((student)=> (
                        <tr key={student.id}>
                            <td>{student.firstname}</td>
                            <td>{student.lastname}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                            <td>{student.email}</td>
                            <td>{student.contactnumber}</td>
                        </tr>
                    ))}

                </table>

            </div>

        </div>
        </>
    )



}

export default UserDashboard