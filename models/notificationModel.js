const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    message: {
      type: String,
      require: true,
    },
    read: {
      type: [String],
      require: true,
    },
    data: {
        type: [String]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);