package com.nikhil.StudentMgtSystem.service;

import com.nikhil.StudentMgtSystem.entity.Student;
import com.nikhil.StudentMgtSystem.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    StudentRepo studentRepo;

    public Student saveStudent(Student student){
        return studentRepo.save(student);
    }

    public List<Student> getAllStudent(){
        return studentRepo.findAll();
    }

    public Student findById(int id){
        Optional<Student> byId = studentRepo.findById(id);
        return byId.get();
    }

    public Student updateStudent(Integer id,Student student){
        Optional<Student> byId = studentRepo.findById(id);
        Student student1 = null;
        if(byId.isPresent()){
            Student obj = byId.get();
            obj.setAge(student.getAge());
            obj.setBranch(student.getBranch());
            obj.setName(student.getName());
            student1 = studentRepo.save(obj);
        }
        else{
            System.out.println("Data not present in db....");
        }
        return student1;
    }
}
