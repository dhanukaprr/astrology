
import { GoogleGenAI, Type } from "@google/genai";
import { BirthInfo, LagnaReading } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getPersonalizedReading = async (info: BirthInfo): Promise<LagnaReading> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const prompt = `Generate a detailed Sri Lankan traditional astrology (Jyotish) reading in Sinhala for a person born on ${info.birthDate} at ${info.birthTime} in ${info.birthPlace}. 
  The response must be in valid JSON format according to the schema provided. 
  Ensure the tone is professional, traditional, and culturally appropriate for Sri Lanka.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          lagna: { type: Type.STRING, description: "The calculated Lagna (Ascendant) in Sinhala" },
          summary: { type: Type.STRING, description: "Overall life summary in Sinhala" },
          predictions: {
            type: Type.OBJECT,
            properties: {
              health: { type: Type.STRING, description: "Health prediction in Sinhala" },
              wealth: { type: Type.STRING, description: "Wealth/Financial prediction in Sinhala" },
              career: { type: Type.STRING, description: "Career prediction in Sinhala" },
              love: { type: Type.STRING, description: "Love/Marriage prediction in Sinhala" }
            },
            required: ["health", "wealth", "career", "love"]
          },
          luckyNumbers: {
            type: Type.ARRAY,
            items: { type: Type.INTEGER }
          },
          luckyColor: { type: Type.STRING, description: "Lucky color in Sinhala" }
        },
        required: ["lagna", "summary", "predictions", "luckyNumbers", "luckyColor"]
      }
    }
  });

  return JSON.parse(response.text || "{}") as LagnaReading;
};

export const getDailyHoroscope = async (lagna: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a short daily horoscope prediction for ${lagna} lagna in Sinhala. Focus on positive guidance. Keep it under 100 words.`,
  });
  return response.text || "තොරතුරු ලබා ගැනීමට නොහැක.";
};
