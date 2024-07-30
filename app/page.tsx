"use client";
import Image from "next/image";
import banner from "@/public/bg-desktop-light.jpeg";
import TodoItem from "./ToDoItem";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";

interface ToDoItem {
  id: number;
  text: string;
  done: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<ToDoItem[]>([
    { id: 1, text: "Complete online JavaScript course", done: false },
    { id: 2, text: "Jog around the park 3x", done: false },
    { id: 3, text: "10 minutes meditation", done: false },
    { id: 4, text: "Read for 1 hour", done: false },
    { id: 5, text: "Pick up groceries", done: false },
    { id: 6, text: "Complete Todo App on Frontend Mentor", done: false },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const itemsLeft = todos.filter((todo) => !todo.done).length;

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTodos((prevTodos) => {
        const oldIndex = prevTodos.findIndex((todo) => todo.id === active.id);
        const newIndex = prevTodos.findIndex((todo) => todo.id === over.id);
        return arrayMove(prevTodos, oldIndex, newIndex);
      });
    }
  }

  function handleDelete(idToDelete: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== idToDelete));
  }

  function addNewTodo(newTodoText: string, checked: boolean) {
    const newId = Math.max(...todos.map((todo) => todo.id), 0) + 1;
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: newId, text: newTodoText, done: checked ?? false },
    ]);
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 pt-20">
      <h1 className="text-4xl font-bold text-white">TODO</h1>
      {/* add tasks input */}
      <div className="mt-4 mb-4 rounded-md overflow-hidden">
        <TodoItem id={0} text="Your new task" onAdd={addNewTodo} />
      </div>
      {/* all tasks */}
      <div className="bg rounded-md overflow-hidden shadow-md divide-y divide-gray-200 dark:divide-gray-600">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                done={todo.done}
                onDelete={handleDelete}
              />
            ))}
          </SortableContext>
        </DndContext>
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
