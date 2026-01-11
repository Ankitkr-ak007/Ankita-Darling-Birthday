import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBirthdayWish = async (friendName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, heartwarming, and fun 3-sentence birthday wish for my friend named ${friendName}. Use emojis generously. The tone should be celebratory and sweet.`,
      config: {
        temperature: 0.9,
      }
    });
    
    return response.text || "Happy Birthday! Wishing you the best day ever! 🎂🎉";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "Happy Birthday! Sending you loads of love and joy on your special day! 🎈✨";
  }
};

export const generateBirthdayPoem = async (friendName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, sweet, rhyming birthday poem (4 lines) for my best friend ${friendName}. It should express how much she means to me and how she is the best girl ever.`,
      config: {
        temperature: 0.8,
      }
    });
    return response.text || "In every laugh and every smile,\nYou make life feel so worthwhile.\nHappy Birthday Ankita dear,\nCelebrating you year after year! 💖";
  } catch (error) {
    console.error("Error generating poem:", error);
    return "In every laugh and every smile,\nYou make life feel so worthwhile.\nHappy Birthday Ankita dear,\nCelebrating you year after year! 💖";
  }
};