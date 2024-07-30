"use client";
import TodoItem from "./ToDoItem";
import { useState, useMemo } from "react";
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
import ThemeChanger from "./themeChanger";

interface ToDoItem {
  id: number;
  text: string;
  done: boolean;
}

type FilterType = "all" | "active" | "completed";

export default function Home() {
  const [todos, setTodos] = useState<ToDoItem[]>([
    { id: 1, text: "Complete online JavaScript course", done: false },
    { id: 2, text: "Jog around the park 3x", done: false },
    { id: 3, text: "10 minutes meditation", done: false },
    { id: 4, text: "Read for 1 hour", done: false },
    { id: 5, text: "Pick up groceries", done: false },
    { id: 6, text: "Complete Todo App on Frontend Mentor", done: false },
  ]);
  const [filter, setFilter] = useState<FilterType>("all");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.done);
      case "completed":
        return todos.filter((todo) => todo.done);
      default:
        return todos;
    }
  }, [todos, filter]);

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
    if (!newTodoText) return;
    const newId = Math.max(...todos.map((todo) => todo.id), 0) + 1;
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: newId, text: newTodoText, done: checked ?? false },
    ]);
  }

  function toggleTodo(id: number) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function clearCompleted() {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.done));
  }

  const sortingButtons = (
    <>
      <button
        onClick={() => setFilter("all")}
        className={filter === "all" ? "selected-sorting" : "sorting-btn"}
      >
        All
      </button>
      <button
        onClick={() => setFilter("active")}
        className={filter === "active" ? "selected-sorting" : "sorting-btn"}
      >
        Active
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={filter === "completed" ? "selected-sorting" : "sorting-btn"}
      >
        Completed
      </button>
    </>
  );
  return (
    <div className="container mx-auto max-w-3xl px-4 pt-20">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-4xl font-bold text-white">TODO</h1>
        <div>
          <ThemeChanger />
        </div>
      </div>
      {/* add tasks input */}
      <div className="mt-4 mb-4 rounded-md overflow-hidden">
        <TodoItem id={0} text="" onAdd={addNewTodo} />
      </div>
      {/* all tasks */}
      <div className="bg rounded-md overflow-hidden shadow-lg divide-y divide-gray-200 dark:divide-gray-600">
        {filteredTodos.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          >
            <SortableContext
              items={filteredTodos}
              strategy={verticalListSortingStrategy}
            >
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  done={todo.done}
                  onDelete={handleDelete}
                  onToggle={() => toggleTodo(todo.id)}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <div className="min-h-14 flex justify-center items-center opacity-50">
            {filter == "all" ? "Nothing to do" : "No tasks found"}
          </div>
        )}

        <div className="p-4  w-full justify-between text-sm sm:text-base hidden sm:flex">
          <p>{itemsLeft} items left</p>
          <div className="flex space-x-2 font-bold">{sortingButtons}</div>
          <button onClick={clearCompleted} className="sorting-btn">
            Clear Completed
          </button>
        </div>
      </div>
      {/* All/Active/Completed detached sorting button at mobile */}
      <div className="bg shadow-lg rounded-md flex justify-center space-x-4 p-2 mt-4 sm:hidden text-base font-bold">
        {sortingButtons}
      </div>

      {/* drag and drop hint */}
      <p className="mt-10 text-base text-center text-gray-400 dark:text-gray-600">
        Drag and drop to reorder list
      </p>
    </div>
  );
}
