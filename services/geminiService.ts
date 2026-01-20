import { GoogleGenAI, Type } from "@google/genai";
import { BirthInfo, LagnaReading } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getPersonalizedReading = async (info: BirthInfo): Promise<LagnaReading> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const prompt = `Generate a detailed Sri Lankan traditional Vedic astrology (Jyotish) reading in English for a person born on ${info.birthDate} at ${info.birthTime} in ${info.birthPlace}. 
  The response must be in valid JSON format according to the schema provided. 
  The tone should be sophisticated, spiritual, and professional.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          lagna: { type: Type.STRING, description: "The calculated Lagna (Ascendant)" },
          summary: { type: Type.STRING, description: "Overall life summary/destiny overview" },
          predictions: {
            type: Type.OBJECT,
            properties: {
              health: { type: Type.STRING, description: "Health and vitality outlook" },
              wealth: { type: Type.STRING, description: "Financial and prosperity forecast" },
              career: { type: Type.STRING, description: "Professional path and success" },
              love: { type: Type.STRING, description: "Relationships and emotional well-being" }
            },
            required: ["health", "wealth", "career", "love"]
          },
          luckyNumbers: {
            type: Type.ARRAY,
            items: { type: Type.INTEGER }
          },
          luckyColor: { type: Type.STRING, description: "Most auspicious color" }
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
    contents: `Write a sophisticated daily horoscope prediction for ${lagna} sign in English. Focus on spiritual guidance and cosmic energy. Keep it under 100 words.`,
  });
  return response.text || "Unable to retrieve cosmic insights at this moment.";
};