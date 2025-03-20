"use client";
import { useEffect } from "react";
import { silkscreen } from "@/app/assets/fonts";

const getRandomCharacter = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

export default function CharacterCursor() {
  useEffect(() => {
    import("cursor-effects")
      .then((module) => {
        if (module?.characterCursor) {
        
          new module.characterCursor({
            element: document.body,
            characters: Array.from({ length: 10 }, getRandomCharacter),
            font: `11px ${silkscreen.style.fontFamily}`,
            colors: ["#ffde44", "#af2946", "#fff", "#af2946"],
            characterLifeSpanFunction: () => Math.floor(Math.random() * 40 + 50),
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
          setTimeout(() => {
            const cursorElement = document.querySelector(".character-cursor");
            if (cursorElement) {
              cursorElement.style.zIndex = "1"; 
              cursorElement.style.position = "absolute"; 
              cursorElement.style.pointerEvents = "none";
            }
          }, 0);
        } else {
          console.error("characterCursor is not available");
        }
      })
      .catch((err) => console.error("Failed to load cursor-effects:", err));
  }, []);

  return null;
}
