"use client";
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import CustomCheckbox from "./CustomCheckbox";

interface TodoItemProps {
  id: number;
  text: string;
  done?: boolean;
  onDelete?: (id: number) => void;
  onAdd?: (text: string, checked: boolean) => void;
  onToggle?: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  done,
  onDelete,
  onAdd,
  onToggle,
}) => {
  const [isChecked, setIsChecked] = useState(done ?? false);
  const [inputText, setInputText] = useState(text);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onAdd) {
      onAdd(inputText, isChecked);
      setInputText("");
    }
  };

  const isCursorGrabbing = attributes["aria-pressed"];

  const toggle: () => void = () => {
    if (onToggle) {
      onToggle();
    }
    setIsChecked(!isChecked);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="todo-item w-full bg flex p-4 items-center hover:bg-gray-100 dark:hover:bg-neutral-800"
    >
      <CustomCheckbox checked={isChecked} onChange={toggle} />
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Create a new todo..."
        style={{
          textDecoration: isChecked ? "line-through" : "none",
        }}
        className={`w-full ${
          isChecked ? "text-gray-400 dark:text-gray-700" : ""
        }`}
      />
      {onDelete && (
        <button onClick={() => onDelete(id)} className="ml-2">
          <Image
            src="/synebo-todo/icon-cross.svg"
            alt="Delete"
            width="15"
            height="15"
          />
        </button>
      )}
      {id !== 0 && (
        <button
          {...attributes}
          {...listeners}
          className={`ml-2 ${
            isCursorGrabbing ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <svg viewBox="0 0 20 20" width="15">
            <path
              d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default TodoItem;
