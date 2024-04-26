import dbConnection from "../../../../utils/dbConnection";
import Todo from "../../../models/Todo";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnection();
    switch (method) {
      case "GET":
        try {
          const todos = await Todo.find({});
          res.status(200).json({ success: true, data: todos });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
        break;

      case "POST":
        try {
          const body = req.body;
          const todos = await Todo.create(body);
          res.status(201).json({ success: true, data: todos });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
        break;

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
