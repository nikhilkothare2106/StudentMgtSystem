package com.example.MongoDemo.repo;

import com.example.MongoDemo.model.Student;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public class SearchRepo {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private MongoConverter converter;

    public List<Student> searchStudents(String text) {
        List<Student> students = new ArrayList<>();
//        System.out.println(text);
        // MongoCollection<Document> collection = mongoDatabase.getCollection("students");
        MongoCollection<Document> collection = mongoTemplate.getCollection("students");

        List<Document> pipeline = Arrays.asList(
                new Document("$search",
                        new Document("text",
                                new Document("query", text)
                                        .append("path", Arrays.asList("name", "age", "gender"))
                        )
                ),
                new Document("$sort",
                        new Document("age", 1)));
        AggregateIterable<Document> results = collection.aggregate(pipeline);
        results.forEach(doc -> students.add(converter.read(Student.class, doc)));
        return students;

    }
}
