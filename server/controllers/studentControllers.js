const StudentModel = require("../models/studentModel");

module.exports.getStudents = async (req, res) => {
  const start = parseInt(req.query._start) || 0;
  const limit = parseInt(req.query._limit) || 10;

  const data = await StudentModel.find().skip(start).limit(limit-start);
  res.send(data);
};
