package com.example.MongoDemo.service;

import com.example.MongoDemo.model.Student;
import com.example.MongoDemo.repo.SearchRepo;
import com.example.MongoDemo.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private SearchRepo searchRepo;

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    public Optional<Student> getStudentById(String id) {
        return studentRepo.findById(id);
    }

    public Student addStudent(Student student) {
        return studentRepo.save(student);
    }

    public Student updateStudent(String id, Student studentDetails) {
        Optional<Student> stud = this.getStudentById(id);
        if (stud.isPresent()) {
            Student student = stud.get();
//           student.setAge(studentDetails.getAge());
//           student.setGender(studentDetails.getGender());
//           student.setName(studentDetails.getName());
//           return studentRepo.save(student);

//           BeanUtils.copyProperties(studentDetails,student,getNullPropertyNames(studentDetails));
//           return  studentRepo.save(student);

            if (studentDetails.getName() != null) {
                student.setName(studentDetails.getName());
            }
            if (studentDetails.getAge() != null) {
                student.setAge(studentDetails.getAge());
            }
            if (studentDetails.getGender() != null) {
                student.setGender(studentDetails.getGender());
            }

            // Save updated student back to the database
            return studentRepo.save(student);
        } else {
            throw new RuntimeException("Student not found with id " + id);
        }
    }

//    private String[] getNullPropertyNames(Student student) {
//        return Arrays.stream(Student.class.getDeclaredFields())
//                .filter(field -> {
//                    field.setAccessible(true);
//                    try {
//                        return field.get(student) == null;
//                    } catch (IllegalAccessException e) {
//                        throw new RuntimeException(e);
//                    }
//                })
//                .map(field -> field.getName())
//                .toArray(String[]::new);
//    }

    public void deleteStudent(String id) {
        studentRepo.deleteById(id);
    }

    public List<Student> addAllStudent(List<Student> student) {
        return studentRepo.saveAll(student);
    }

    public List<Student> searchStudents(String text) {
        return searchRepo.searchStudents(text);
    }
}
