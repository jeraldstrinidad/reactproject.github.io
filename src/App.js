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
      <button
        onClick={() => toggleNotification()}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Toggle Notification
      </button>
      {showNotification ? (
        <div className="text-white bg-green-700 focus:ring-4 font-medium rounded-md text-sm px-4 py-2.5 me-2 mb-2 dark:bg-green-600  focus:outline-none ">
          This is Notification
        </div>
      ) : (
        ""
      )}

      <form onSubmit={handleSubmit}>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="fname">
          Add new student
        </label>
        <input
          name="fname"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

      <br></br>
      <h1>All Students</h1>

      <table class="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student}</td>
              <td className="px-6 py-1">
                <button
                  onClick={() => handleDelete(student)}
                  className="bg-red-500 hover:bg-red-700 text-white font-normal py-1 px-1 border border-red-700 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}

export default App;
