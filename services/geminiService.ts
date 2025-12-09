import { GoogleGenAI, Modality } from "@google/genai";

// NOTE: In a real production app, this should be handled securely.
// Since we are frontend-only for this demo, we assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateTutorResponse = async (userMessage: string, context: string) => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      You are a friendly and encouraging English tutor for A2 level students.
      The current lesson is about "Legends of the Ottoman Seas" (Barbaros Hayreddin Paşa and Karamürsel Bey).
      The grammar focus is "Past simple of be (was/were)".
      
      Rules:
      1. Keep sentences short and simple (A2 level).
      2. Correct grammar mistakes gently.
      3. If the user asks about the history, answer briefly based on the lesson context provided.
      4. Be supportive.
      
      Context from current slide: ${context}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Tutor Error:", error);
    return "Sorry, I am having trouble connecting to the captain right now. Please try again.";
  }
};

export const generateSpeech = async (text: string): Promise<AudioBuffer | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return null;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    return await audioContext.decodeAudioData(bytes.buffer);

  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return null;
  }
};
