
import { GoogleGenAI, Type } from "@google/genai";
import { Track } from "../types";

// Initialize GoogleGenAI with the API key from environment variables as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAITrackSuggestions = async (currentTracks: (Track | null)[], bpmRange: [number, number]): Promise<any[]> => {
  // Use ai.models.generateContent directly with model name and prompt
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest 5 tracks that would go well with: ${currentTracks.map(t => t ? `${t.title} by ${t.artist} (${t.bpm} BPM)` : 'Empty Deck').join(' and ')}. Focus on tracks within the ${bpmRange[0]}-${bpmRange[1]} BPM range. Return just the song names and artists.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            artist: { type: Type.STRING },
            reason: { type: Type.STRING, description: "Why this track fits the current vibe" }
          },
          required: ["title", "artist", "reason"]
        }
      }
    }
  });

  try {
    // Access the text property directly on the response object
    const text = response.text;
    return text ? JSON.parse(text) : [];
  } catch (e) {
    return [];
  }
};

export const getTransitionAdvice = async (trackA: Track, trackB: Track): Promise<string> => {
  // Use ai.models.generateContent directly
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As a professional DJ, how would you transition from "${trackA.title}" by ${trackA.artist} (${trackA.bpm} BPM) into "${trackB.title}" by ${trackB.artist} (${trackB.bpm} BPM)? Keep it concise.`
  });
  // Access the text property directly
  return response.text || "Smoothly crossfade during the breakdown.";
};
