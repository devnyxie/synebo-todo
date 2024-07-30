"use client";
import React, { useState } from "react";

interface TodoItemProps {
  text: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ text }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [inputText, setInputText] = useState(text);

  return (
    <div className="todo-item w-full bg flex p-4">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{
          textDecoration: isChecked ? "line-through" : "none",
        }}
        className="w-full"
      />
      {/* <button onClick={onDelete}>×</button> */}
    </div>
  );
};

export default TodoItem;
