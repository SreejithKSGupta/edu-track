const Notification = require('../models/notificationModel');

module.exports.sendNotification = async(req, res)=>{
    const {title, type, message, read, data} = req.body;

    try {
        Notification.create({
            title, type, message, read, data
        }).then((data)=>{
            console.log("New Notification...");
            res.send(data);
        })
    } catch (error) {
        return res.json(error);
    }
}

module.exports.getNotifications = async(req, res)=>{
    const data = await Notification.find();
    res.send(data);
}

module.exports.readNotifications = async(req, res)=>{
    const {_id} = req.params;
    const {user_id} = req.body;
    try {
        console.log(_id, user_id);
        
        await Notification.findByIdAndUpdate(
            _id,
            { $push: { read: user_id } },
            { new: true }
        );
        res.status(200).send({ message: "Notification marked as read." });
    } catch (error) {
        res.status(500).send({ message: "Error marking notification as read.", error });
    }
}