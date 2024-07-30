// light icon -> /synebo-todo/icon-sun.svg
// dark icon -> /synebo-todo/icon-moon.svg

"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const [icon, setIcon] = useState("");
  useEffect(() => {
    if (theme === "dark") {
      setIcon("/synebo-todo/icon-sun.svg");
    } else if (theme === "light") {
      setIcon("/synebo-todo/icon-moon.svg");
    } else {
      setIcon("/synebo-todo/icon-system.svg");
    }
  }, [theme]);

  return (
    <div>
      <button onClick={() => setTheme(theme == "light" ? "dark" : "light")}>
        <Image
          src={icon}
          alt="Toggle Color Mode"
          width={24}
          height={24}
          className="text-white"
        />
      </button>
    </div>
  );
};

export default ThemeChanger;
