"use client";
import { useEffect } from "react";
import { silkscreen } from "@/app/assets/fonts";

export default function CharacterCursor() {
  useEffect(() => {
    import("cursor-effects")
      .then((module) => {
        if (module?.characterCursor) {
          new module.characterCursor({
            element: document.body,
            characters: ["h", "e", "l", "o", "a", "q", "r", "f", "u", "b"],
            font: `12px ${silkscreen.style.fontFamily}`,
           
            colors: ["#ffde44", "#af2946", "#fff", "#e76742", "#908279"],
            characterLifeSpanFunction: () =>
              Math.floor(Math.random() * 40 + 50),
            initialCharacterVelocityFunction: () => ({
              x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 2.5,
              y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 2.5,
            }),
            characterVelocityChangeFunctions: {
              x_func: () => (Math.random() < 1 ? -2 : 1) / 60,
              y_func: () => (Math.random() < 0.5 ? -1 : 1) / 30,
            },
            characterScalingFunction: (age, lifeSpan) =>
              Math.max(((lifeSpan - age) / lifeSpan) * 2, 0),
            characterNewRotationDegreesFunction: (age, lifeSpan) =>
              (lifeSpan - age) / 5,
          });
        } else {
          console.error("characterCursor is not available");
        }
      })
      .catch((err) => console.error("Failed to load cursor-effects:", err));
  }, []);

  return null;
}
