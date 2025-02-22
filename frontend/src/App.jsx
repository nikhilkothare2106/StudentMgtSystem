import React from 'react';
import { store } from './App/store'; 
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import SearchStudent from './components/SearchStudent';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <div className="max-w-xl mx-auto mt-10 p-5 border rounded shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-5">Student Management</h1>
        <AddStudent />
        <SearchStudent />
        <StudentList />
      </div>
    </Provider>
  );
};

export default App;
