const {Router} = require('express');
const { getStudents } = require('../controllers/studentControllers');

const router = Router();

router.get('/students', getStudents);

module.exports = router;