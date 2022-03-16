const mongoose = require("mongoose");

const mySchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      unique: true,
    },
    mail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      default:
        "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
    },
    general_name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    submission: [
      {
        submission_id: { type: String },
        problem_name: { type: String },
        problem_id: { type: String },
        level: { type: String },
        language: { type: String },
        status:{type:String},
        timeline: { type: Number, default: Date.now(), required:true },
      },
    ],
    school: {
      type: String,
      default: "Your School",
    },
    location: {
      type: String,
      default: "India",
    },
    rating: {
      type: Number,
      default: 0,
    },
    socials: {
      linkedin: {
        type: String,
        default: "Your Linkedin",
      },
      github: {
        type: String,
        default: "Your github",
      },
      twitter: {
        type: String,
        default: "Your twitter",
      },
    },
    post: [String],
    likes:[String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", mySchema);
