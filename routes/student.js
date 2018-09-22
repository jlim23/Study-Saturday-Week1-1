let students = [
    {id: 0, name: "Dan"},
    {id: 1, name: "Karen"},
    {id: 2, name: "Connie"},
    {id: 3, name: "Danielle"},
    {id: 4, name: "Kathy"},
    {id: 5, name: "Amy"},
    {id: 6, name: "Ashi"}
]

// let tests = [
//     {id: 0, score: 80, subject: "Physics", studentID: 2},
//     {id: 1, score: 55, subject: "Math", studentID: 6},
//     {id: 2, score: 70, subject: "English", studentID: 3},
//     {id: 3, score: 100, subject: "Psychology", studentID: 1},
//     {id: 4, score: 99, subject: "Chemistry", studentID: 5},
//     {id: 5, score: 48, subject: "Biology", studentID: 0},
//     {id: 6, score: 68, subject: "Computer Science", studentID: 4}
// ]

// create a router
const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.send(students);
});

// :id, id is what user puts in, req.params.id (.id will match the :id user puts in)
// how do you get the id the user puts in from students?
router.get("/:id", (req, res, next) => {
    const id = Number(req.params.id);
    // console.log(id);
    res.send(students.filter(student => student.id === id));
    // console.log(typeof id), typeof id was string;
});

router.post("/", (req, res, next) => {
    // submit button of a form will create a post request
    // HEAD is checking the status, body you don't care unless it's post or put
    // req.body might look like {id: 3, name: Dan}
    const newStudent = req.body;
    students.push(newStudent);
    res.send(students);
});

// put('http://locatlhost:3000/students/2', {name: "Dan"})
router.put("/:id", (req, res, next) => {
    const updatedStudentName = req.params.id; // {id: 2, name: "Dan"}
    // say you want to change the name of the student?
    const updatedStudent = students.find(student => student.id === req.params.id)
    updatedStudent.name = req.body.name;
    // find will give you an object, filter will give you array with the object
    // updatedStudent[0]
    res.json(students); // can be res.send(students)
})
// put route is similar to post, but you're updating the info you're getting

// delete, this student doesn't study here anymore
router.delete("/:id", (req, res, next) => {
    let deletedStudentId = +req.params.id;
    students.filter(student => student.id !== deletedStudentId);
    res.send(students);
})

module.exports = router;

// req is JSON object, req.body is what client is sending (inputs), those inputs are part of your req.body
// express will parse it and take the params that match (name)

// postman checks to see if your backend is working properly
// POST http://localhost:3000/students
// raw, JSON
// body {"id": 3, "name": "Pankti"}

// add in json with double quotes