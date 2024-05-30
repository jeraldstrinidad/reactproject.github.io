import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { database } from "../config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

function ContactPage() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [id, setId] = useState("");

  const [show, setShow] = useState(false);

  const [val, setVal] = useState([]);

  const value = collection(database, "demo");

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);

      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  });

  const handleCreate = async () => {
    await addDoc(value, { name1: fname, name2: lname });
    setFname("");
    setLname("");
  };

  const handleDelete = async (id) => {
    const deleteVal = doc(database, "demo", id);
    await deleteDoc(deleteVal);
  };

  const handleEdit = async (id, name1, name2) => {
    setFname(name1);
    setLname(name2);
    setId(id);
    setShow(true);
  };

  const handleUpdate = async () => {
    const updateData = doc(database, "demo", id);
    await updateDoc(updateData, { name1: fname, name2: lname });
    setShow(false);
    setFname("");
    setLname("");
  };

  return (
    <MainLayout>
      <div>Contact page</div>
      <div>This data below is from Firebase</div>
      <input value={fname} onChange={(e) => setFname(e.target.value)} />
      <input value={lname} onChange={(e) => setLname(e.target.value)} />
      {!show ? (
        <button onClick={handleCreate}>Add Entry</button>
      ) : (
        <button onClick={handleUpdate}>Update</button>
      )}

      <table class="table-auto">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {val.map((values) => (
            <tr>
              <td>{values.name1}</td>
              <td>{values.name2}</td>
              <td>
                <button
                  onClick={() =>
                    handleEdit(values.id, values.name1, values.name2)
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(values.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}

export default ContactPage;
