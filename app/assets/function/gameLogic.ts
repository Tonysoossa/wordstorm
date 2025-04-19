let score = 0;

export const fetchNewWord = async (): Promise<string> => {
  try {
    const response = await fetch("https://trouve-mot.fr/api/random");
    const data = await response.json();
    return data[0]?.name || "";
  } catch (error) {
    console.error("Erreur lors de la récupération du mot :", error);
    return "erreur";
  }
};

export const checkEquality = (x: string, y: string): boolean => {
  return x.toLowerCase() === y.toLowerCase();
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
  
  return { newWord: word, newScore: score };
};

export const resetScore = (): void => {
  score = 0;
};

export const getCurrentScore = (): number => {
  return score;
};