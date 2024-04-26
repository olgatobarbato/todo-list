import dbConnection from "../../../../utils/dbConnection";
import Todo from "../../../models/Todo";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    await dbConnection();
    switch (method) {
      case "GET":
        try {
          const todoItem = await Todo.findById(id);
          if (!todoItem) {
            return res
              .status(404)
              .json({ success: false, error: "TodoItem not found!" });
          }
          res.status(200).json({ success: true, data: todoItem });
        } catch (error) {
          res.status(400).json({ success: false, message: error.message });
        }
        break;

      case "PUT":
        try {
          const body = req.body;
          const todoItem = await Todo.findByIdAndUpdate(id, body);
          if (!todoItem) {
            return res
              .status(404)
              .json({ success: false, error: "TodoItem not found!" });
          }
          res.status(200).json({ success: true, data: todoItem });
        } catch (error) {
          res.status(400).json({ success: false, message: error.message });
        }
        break;

      case "DELETE":
        try {
          const todoItem = await Todo.findByIdAndDelete(id);
          if (!todoItem) {
            return res
              .status(400)
              .json({ success: false, error: "TodoItem not found!" });
          }
          res.status(200).json({ success: true, data: {} });
        } catch (error) {
          res.status(400).json({ success: false, message: error.message });
        }
        break;

      default:
        res.setHeaders("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} not allowed`);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
