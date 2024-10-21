import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const getDbPath = () => path.join(process.cwd(), "localDatabase", "tasks.json");

const readTasks = () => {
  const data = fs.readFileSync(getDbPath(), "utf-8");
  return JSON.parse(data);
};

const writeTasks = (tasks: any[]) => {
  fs.writeFileSync(getDbPath(), JSON.stringify(tasks, null, 2));
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );


  const { id } = req.query;
  const tasks = readTasks();

  switch (req.method) {
    case "GET":
      if (!id) {
        return res.status(200).json(tasks);
      }

      const task = tasks.find((task: any) => task.id === id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.status(200).json(task);

    case "POST":
      const newTask = { ...req.body };
      tasks.push(newTask);
      writeTasks(tasks);
      return res.status(201).json(newTask);

    case "PUT":
      const taskIndex = tasks.findIndex((task: any) => task.id === id);
      if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
      }
      tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
      writeTasks(tasks);
      return res.status(200).json(tasks[taskIndex]);

    case "DELETE":
      const deleteIndex = tasks.findIndex((task: any) => task.id === id);
      if (deleteIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
      }
      tasks.splice(deleteIndex, 1);
      writeTasks(tasks);
      return res.status(204).end();

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
