const {Router} = require('express');
const { sendNotification, getNotifications, readNotifications } = require('../controllers/notificationControllers');

const router = Router();

router.post('/send-notification', sendNotification);
router.get('/notifications', getNotifications);
router.put('/read-notification/:_id', readNotifications)

module.exports = router;