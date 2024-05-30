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
      <form>
        <div class="grid gap-4 mb-4 md:grid-cols-3">
          <div>
            <label
              for="small-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="small-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="small-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              &nbsp;
            </label>
            {!show ? (
              <button
                onClick={handleCreate}
                className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-1 px-2 border border-blue-700 rounded mr-2"
              >
                Add Entry
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                className="bg-violet-500 hover:bg-violet-700 text-white font-normal py-1 px-2 border border-violet-700 rounded mr-2"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </form>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {val.map((values) => (
            <tr>
              <td className="px-6 py-1">{values.name1}</td>
              <td className="px-6 py-1">{values.name2}</td>
              <td className="px-6 py-1">
                <button
                  onClick={() =>
                    handleEdit(values.id, values.name1, values.name2)
                  }
                  className="bg-green-500 hover:bg-green-700 text-white font-normal py-1 px-2 border border-green-700 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(values.id)}
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

export default ContactPage;
