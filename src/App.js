import { useState } from "react";
import "./App.css";
import MainLayout from "./layout/MainLayout";

function App() {
  const [name, setName] = useState("");

  const [students, setStudents] = useState(["Yesha", "Yoshi", "Yohan"]);

  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setStudents((currentStudents) => [...currentStudents, name]);
    setName("");
  };

  const handleDelete = (deletingStudent) => {
    const newStudents = students.filter(
      (student) => student !== deletingStudent
    );
    setStudents(newStudents);
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <MainLayout>
      {showNotification ? (
        <div className="notification">This is Notification</div>
      ) : (
        ""
      )}

      <button onClick={() => toggleNotification()}>Toggle Notification</button>

      <form onSubmit={handleSubmit}>
        <div>Add new student</div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input type="submit"></input>
      </form>

      <br></br>
      <h1>All Students</h1>

      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student}{" "}
            <button onClick={() => handleDelete(student)}>Delete</button>
          </li>
        ))}
      </ul>
    </MainLayout>
  );
}

export default App;
