import React, { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  className?: string;
  strings?: string[];
}

const defaultStrings = ["Bank Account", "Web Payment", "Android & iOS"];

const TypewriterComponent: React.FC<TypewriterProps> = ({
  className = "text-xl font-semibold text-primary",
  strings = defaultStrings,
}) => {
  const [activeStringIndex, setActiveStringIndex] = useState(0);
  const typeitRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeitRef.current) {
      typeitRef.current.style.width =
        typeitRef.current.querySelector(".is-visible")?.scrollWidth + "px" || "auto";
    }

    const repeatTyping = setInterval(() => {
      if (typeitRef.current) {
        typeitRef.current.style.width = "0px";
      }
      setTimeout(() => {
        setActiveStringIndex((prev) => (prev === strings.length - 1 ? 0 : prev + 1));
        setTimeout(() => {
          if (typeitRef.current) {
            typeitRef.current.style.width =
              typeitRef.current.querySelector(".is-visible")?.scrollWidth + "px" || "auto";
          }
        }, 10);
      }, 600);
    }, 3000);

    return () => {
      clearInterval(repeatTyping);
    };
  }, [strings]);

  return (
    <span ref={typeitRef} className="relative inline-block overflow-hidden">
      {strings.map((text, i) => (
        <span
          key={i}
          className={`${className} transition-all duration-500 ease-in-out ${
            activeStringIndex === i ? "is-visible opacity-100" : "is-hidden opacity-0"
          }`}
        >
          {text}
        </span>
      ))}
    </span>
  );
};

export default TypewriterComponent;