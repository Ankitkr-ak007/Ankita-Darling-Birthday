import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBirthdayWish = async (friendName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a deeply emotional and touching birthday wish for my best friend, ${friendName}. Express how she is a blessing in my life, how much I value our bond, and that I want her to feel incredibly happy and loved from the inside. The tone should be sincere, warm, and affectionate like a best friend speaking from the heart. Use heartwarming emojis. Max 3 sentences.`,
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
      contents: `Write a short, emotional 4-line rhyming birthday poem for my best friend ${friendName}. Focus on how special she is, the warmth she brings to my life, and our beautiful friendship. Make it sweet and touching. Use emojis.`,
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