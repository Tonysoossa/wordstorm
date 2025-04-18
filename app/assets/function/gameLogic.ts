// utils/gameLogic.ts

// Variable globale pour le score
let score = 0;

export const fetchNewWord = async (): Promise<string> => {
  try {
    const response = await fetch("https://trouve-mot.fr/api/random");
    const data = await response.json();
    // Assurons-nous que nous récupérons le mot correctement
    return data[0]?.name || "";
  } catch (error) {
    console.error("Erreur lors de la récupération du mot :", error);
    return "";
  }
};

export const checkEquality = (x: string, y: string): boolean => {
  return x.toLowerCase() === y.toLowerCase(); // Insensible à la casse pour plus de facilité
};

export const handleValidation = async (
  input: string,
  word: string
): Promise<{ newWord: string; newScore: number }> => {
  if (checkEquality(input, word)) {
    score += 1;
    const newWord = await fetchNewWord();
    return { newWord, newScore: score };
  }
  
  // Si le mot n'est pas égal, retourner le même mot
  return { newWord: word, newScore: score };
};

// Réinitialiser le score
export const resetScore = (): void => {
  score = 0;
};