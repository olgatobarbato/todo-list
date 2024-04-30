import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    default: "Olga",
  },
  avatar: {
    type: String,
    required: false,
    default:
      "https://source.boringavatars.com/marble/120/Maria%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51",
  },
  todo_title: {
    type: String,
    required: false,
    default: "Title not found",
  },
  todo_content: {
    type: String,
    required: false,
    default: "content not found",
  },
  todo_date: {
    type: Date,
    required: false,
  },
  todo_time: {
    type: Date,
    required: false,
  },
  categories: {
    type: String,
    required: false,
  },
  isInProgress: {
    type: Boolean,
    default: true,
    required: false,
  },
});

module.exports = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
