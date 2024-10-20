import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
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
  if (req.method === "GET") {
    const tasks = readTasks();
    res.status(200).json(tasks);
  } else if (req.method === "POST") {
    const tasks = readTasks();
    const newTask = { id: uuidv4(), ...req.body };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
