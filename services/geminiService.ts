import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBirthdayWish = async (friendName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a deeply emotional and touching birthday wish for my best friend and love, ${friendName}. Express how she makes my life complete and brings me so much joy. Make it sound sincere, warm, and loving to make her feel good from the inside. Use heartwarming emojis. Max 3 sentences.`,
      config: {
        temperature: 0.7,
      }
    });
    
    return response.text || `Happy Birthday, ${friendName}! 💖 You are the most beautiful soul I know and my absolute best friend. Thank you for filling my life with so much love and laughter. I hope your day is as wonderful as you make me feel every day! 🌸✨`;
  } catch (error) {
    console.error("Error generating wish:", error);
    return `Happy Birthday, ${friendName}! 💖 You are the most beautiful soul I know and my absolute best friend. Thank you for filling my life with so much love and laughter. I hope your day is as wonderful as you make me feel every day! 🌸✨`;
  }
};

export const generateBirthdayPoem = async (friendName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, emotional 4-line rhyming birthday poem for my best friend ${friendName} who I love dearly. Focus on her beautiful heart and our special bond. Use emojis.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "To Ankita, my best friend and heart so true, 💖\nLife is a beautiful journey because of you. 🌸\nMay your day be filled with endless light, ✨\nAnd happiness that shines so bright! 🎂";
  } catch (error) {
    console.error("Error generating poem:", error);
    return "To Ankita, my best friend and heart so true, 💖\nLife is a beautiful journey because of you. 🌸\nMay your day be filled with endless light, ✨\nAnd happiness that shines so bright! 🎂";
  }
};