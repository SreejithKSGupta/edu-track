const {Router} = require('express');
const { getLoggedInUser, createUser, allUsers } = require('../controllers/userControllers');

const router = Router();

router.post('/users', getLoggedInUser);
router.get('/all-users', allUsers);
router.post('/create-user', createUser);


module.exports = router;