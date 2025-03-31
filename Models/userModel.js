import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    profile: {
      type: String,
      default:
        "https://www.google.com/imgres?q=profile%20picture%20placeholder&imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2F87%2F14%2F55%2F8714556a52021ba3a55c8e7a3547d28c.jpg&imgrefurl=https%3A%2F%2Fin.pinterest.com%2Fpin%2Fprofile-icon-png-image-free-download-searchpng-employee-photo-placeholder-transparent-png-is-free-tran--1020487596788968152%2F&docid=m_BKqgClh6NXXM&tbnid=tEgDKjy456xtdM&vet=12ahUKEwie6cqckrSMAxVeSGcHHVfjHIEQM3oECGgQAA..i&w=736&h=580&hcb=2&ved=2ahUKEwie6cqckrSMAxVeSGcHHVfjHIEQM3oECGgQAA",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
