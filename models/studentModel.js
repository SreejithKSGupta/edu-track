const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    student_id: {
      type: String,
      required: true,
    },
    student_name: {
      type: String,
      require: true,
    },
    student_email: {
      type: String,
      require: true,
    },
    student_phone: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);