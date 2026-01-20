import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getDailyHoroscope = async (lagna: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a sophisticated, spiritual daily horoscope prediction for ${lagna} sign in English. Use a traditional Vedic/Jyotish tone suitable for a Sri Lankan business. Focus on cosmic energy and guidance. Keep it under 80 words.`,
  });
  return response.text || "Cosmic insights are currently being recalculated by the heavens.";
};