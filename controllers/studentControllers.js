const StudentModel = require("../models/studentModel");

module.exports.getStudents = async (req, res) => {
  const start = parseInt(req.query._start) || 0;
  const limit = parseInt(req.query._limit) || 10;

  const data = await StudentModel.find()
    .skip(start)
    .limit(limit - start);
  res.send(data);
};

module.exports.createStudent = async (req, res) => {
  const { student_id, student_name, student_email, student_phone, gender } =
    req.body;
  try {
    console.log(student_id);

    StudentModel.create({
      student_id,
      student_name,
      student_email,
      student_phone,
      gender,
    }).then((data) => {
      console.log("Added successfully...");
      res.send(data);
    });
  } catch (error) {
    return res.json(error);
  }
};

module.exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await StudentModel.find({ student_id: id });
    res.send(student);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.updateStudentById = async (req, res) => {
  try {
    const {_id} = req.params;
    const {
      student_id,
      student_name,
      student_email,
      student_phone,
      gender,
    } = req.body;
    let updateData = {};
    if (student_id) updateData.student_id = student_id;
    if (student_name) updateData.student_name = student_name;
    if (student_email) updateData.student_email = student_email;
    if (student_phone) updateData.student_phone = student_phone;
    if (gender) updateData.gender = gender;
    console.log(updateData, _id);
    
    StudentModel.findByIdAndUpdate(_id, updateData).then(() => {
      res.status(200).send("Updated...");
    }).catch((error) => {
      res.status(500).send("Error updating student: " + error.message);
    });
  } catch (error) {
    console.log(error);
  }
};
