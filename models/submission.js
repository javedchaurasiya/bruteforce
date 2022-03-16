const mongoose = require("mongoose");

const mySchema = new mongoose.Schema({
  submission_id: {
    type: String,
    required: true,
    unique: true,
  },
  problem_id: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  src_code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  user_output: {
    type: String,
    required: true,
  },
  expected_output: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Submission", mySchema);
