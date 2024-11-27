package com.nikhil.StudentMgtSystem.controller;

import com.nikhil.StudentMgtSystem.entity.Student;
import com.nikhil.StudentMgtSystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("student")
public class StudentController {
    @Autowired
    StudentService studentService;

    @PostMapping("/create")
    public Student createStudent(@RequestBody  Student student){
       return studentService.saveStudent(student);
    }

    @GetMapping("/all")
    public List<Student> getAllStudents(){
        return studentService.getAllStudent();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable int id){
        return studentService.findById(id);
    }

    @PatchMapping
    public Student updateStudent(@RequestParam Integer id, @RequestBody Student student){
        return  studentService.updateStudent(id,student);
    }
}
