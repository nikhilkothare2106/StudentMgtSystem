import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent } from '../App/studentsSlice'; 

const AddStudent = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent({ name, age, gender }));
    setName('');
    setAge('');
    setGender('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-gray-100 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Add Student</h2>
      <input className="p-2 border rounded w-full mb-2" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className="p-2 border rounded w-full mb-2" type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}  />
      <select className="p-2 border rounded w-full mb-2" value={gender} onChange={(e) => setGender(e.target.value)} >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded">Add</button>
    </form>
  );
};

export default AddStudent;
