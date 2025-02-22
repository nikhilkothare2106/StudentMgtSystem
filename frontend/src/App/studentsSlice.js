import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/api/students";

// Fetch all students
export const fetchStudents = createAsyncThunk("students/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add a student
export const addStudent = createAsyncThunk("students/add", async (student) => {
  const response = await axios.post(`${API_URL}/add`, student);
  return response.data;
});

// Update a student
export const updateStudent = createAsyncThunk("students/update", async ({ id, student }) => {
  const response = await axios.put(`${API_URL}/${id}`, student);
  return response.data;
});

// Delete a student
export const deleteStudent = createAsyncThunk("students/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Search students
export const searchStudents = createAsyncThunk("students/search", async (query) => {
  const response = await axios.get(`${API_URL}/search/${query}`);
  return response.data;
});

const studentSlice = createSlice({
  name: "students",
  initialState: { students: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.students[index] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((s) => s.id !== action.payload);
      })
      .addCase(searchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      });
  },
});

export default studentSlice.reducer;
