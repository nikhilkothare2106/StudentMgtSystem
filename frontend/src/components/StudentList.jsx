import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, fetchStudents, updateStudent } from "../App/studentsSlice";

const StudentList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  
  // Local state to manage which student is being edited
  const [editingStudent, setEditingStudent] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: "", age: 0, gender: "" });

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // Start editing a student
  const handleEdit = (student) => {
    setEditingStudent(student.id);
    setUpdatedData({ name: student.name, age: student.age, gender: student.gender });
  };

  // Save updated student
  const handleSave = (id) => {
    dispatch(updateStudent({ id, student: updatedData }));
    setEditingStudent(null);
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Student List</h1>
      <ul>
        {students.map((student) => (
          <li
            key={student.id}
            className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
          >
            {editingStudent === student.id ? (
              <div className="flex gap-2">
                <input
                  className="p-1 border rounded"
                  type="text"
                  value={updatedData.name}
                  onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                />
                <input
                  className="p-1 border rounded w-16"
                  type="number"
                  value={updatedData.age}
                  onChange={(e) => setUpdatedData({ ...updatedData, age: e.target.value })}
                />
                <select
                  className="p-1 border rounded"
                  value={updatedData.gender}
                  onChange={(e) => setUpdatedData({ ...updatedData, gender: e.target.value })}
                >

                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <button
                  onClick={() => handleSave(student.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <span>
                {student.name} ({student.age}, {student.gender})
              </span>
            )}

            <div className="flex gap-2">
              {editingStudent === student.id ? null : (
                <button
                  onClick={() => handleEdit(student)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Update
                </button>
              )}
              <button
                onClick={() => dispatch(deleteStudent(student.id))}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
