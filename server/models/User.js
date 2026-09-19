const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  bio: { type: String, default: "" },
skills: { type: [String], default: [] },
interests: { type: [String], default: [] },
experienceLevel: { 
  type: String, 
  enum: ["Beginner", "Intermediate", "Advanced"], 
  default: "Beginner" 
},
githubLink: { type: String, default: "" },
profileImage: { type: String, default: "" },

});

module.exports = mongoose.model("User", userSchema);