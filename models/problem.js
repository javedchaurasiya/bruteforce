const mongoose = require("mongoose");

const mySchema = new mongoose.Schema(
  {
    problem_id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    constraints: [String],
    example_input: {
      type: String,
      required: true,
    },
    example_output: {
      type: String,
      required: true,
    },
    test_input: {
      type: String,
      required: true,
    },
    test_output: {
      type: String,
      required: true,
    },
    tags: [String],
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", mySchema);
