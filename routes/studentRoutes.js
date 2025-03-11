    const {Router} = require('express');
    const { getStudents, createStudent, getStudentById, updateStudentById } = require('../controllers/studentControllers');

    const router = Router();

    router.get('/students', getStudents);
    router.get('/students/:id', getStudentById);
    router.post('/create-student', createStudent);
    router.put('/students/:_id', updateStudentById);

    module.exports = router;