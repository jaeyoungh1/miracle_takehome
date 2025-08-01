// components/FontToggleWidget.tsx
import React, { useEffect, useState, useRef } from "react";
import { Text } from "lucide-react";
import { cn } from "../../lib/utils";
const FONT_CLASS_KEY = "app-font-size";

const FontToggleWidget = () => {
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
    "medium"
  );
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(FONT_CLASS_KEY) as
      | "small"
      | "medium"
      | "large"
      | null;

    if (saved) {
      setFontSize(saved);
      applyFontClass(saved);
    } else {
      applyFontClass("medium");
    }
  }, []);

  const applyFontClass = (size: "small" | "medium" | "large") => {
    const root = document.documentElement;
    root.classList.remove("font-small", "font-medium", "font-large");
    root.classList.add(`font-${size}`);
  };

  const handleSelect = (size: "small" | "medium" | "large") => {
    setFontSize(size);
    applyFontClass(size);
    localStorage.setItem(FONT_CLASS_KEY, size);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 rounded-full border bg-white shadow hover:bg-gray-100"
        title="Change Font Size"
      >
        <span className="font-semibold text-lg">Aa</span>
      </button>

      {open && (
        <div className="mt-2 w-24 bg-white border rounded shadow-lg absolute right-0">
          {["small", "medium", "large"].map((size) => (
            <button
              key={size}
              onClick={() => handleSelect(size as "small" | "medium" | "large")}
              className={cn(
                "block w-full text-left px-4 py-2 hover:bg-gray-100",
                fontSize === size ? "font-bold text-blue-600" : ""
              )}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FontToggleWidget;
