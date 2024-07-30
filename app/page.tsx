"use client";
import TodoItem from "./ToDoItem";
import { useState } from "react";

interface ToDoItem {
  text: string;
  done: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<ToDoItem[]>([
    { text: "Complete online JavaScript course", done: false },
    { text: "Jog around the park 3x", done: false },
    { text: "10 minutes meditation", done: false },
    { text: "Read for 1 hour", done: false },
    { text: "Pick up groceries", done: false },
    { text: "Complete Todo App on Frontend Mentor", done: false },
  ]);
  const itemsLeft = todos.filter((todo) => !todo.done).length;
  return (
    <div className="container mx-auto max-w-4xl px-4 pt-20">
      <h1 className="text-4xl font-bold text-white">TODO</h1>
      {/* add tasks input */}
      <div className="mt-4 mb-4 rounded-md overflow-hidden">
        <TodoItem text="Your new task" />
      </div>

      {/* all tasks */}
      <div className="rounded-md overflow-hidden shadow-md divide-y divide-gray-200 dark:divide-gray-600">
        {todos.map((todo, index) => (
          <TodoItem key={index} text={todo.text} />
        ))}
        <div className="p-4 flex w-full justify-between text-base">
          <p>{itemsLeft} items left</p>
          <div className="flex space-x-2">
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
          </div>
          <button>Clear Completed</button>
        </div>
      </div>
    </div>
  );
}
