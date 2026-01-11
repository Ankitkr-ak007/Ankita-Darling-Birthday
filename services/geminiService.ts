import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBirthdayWish = async (friendName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a playful, teasing, and slightly flirtatious birthday wish for my best friend named ${friendName}. It should be magnetic and make her blush slightly. Tell her she's absolute trouble but the most beautiful kind of trouble. Keep it affectionate, exciting, and appropriate, but make her feel that electric connection. Max 3 sentences.`,
      config: {
        temperature: 1.0,
      }
    });
    
    return response.text || `Happy Birthday, ${friendName}! You are absolute trouble, but you're my favorite kind of trouble. Stop looking so gorgeous today, it's unfair to everyone else! 😉🔥`;
  } catch (error) {
    console.error("Error generating wish:", error);
    return `Happy Birthday, ${friendName}! You are absolute trouble, but you're my favorite kind of trouble. Stop looking so gorgeous today, it's unfair to everyone else! 😉🔥`;
  }
};

export const generateBirthdayPoem = async (friendName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a 4-line rhyming birthday poem for my best friend ${friendName}. The tone should be teasing, electric, and intimate. Focus on her irresistible charm and how she drives me crazy in the best way possible. Make it feel like a deep, exciting connection that creates butterflies.`,
      config: {
        temperature: 0.9,
      }
    });
    return response.text || "You’ve got that spark that drives me mad,\nThe best bad influence I’ve ever had.\nDangerously cute and totally true,\nThere is nobody else quite like you. 😏✨";
  } catch (error) {
    console.error("Error generating poem:", error);
    return "You’ve got that spark that drives me mad,\nThe best bad influence I’ve ever had.\nDangerously cute and totally true,\nThere is nobody else quite like you. 😏✨";
  }
};