import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { GeminiResponse, IslamicQuote, StoryAnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Using mocked responses for demo purposes.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const politeAlternativesSchema = {
  type: Type.OBJECT,
  properties: {
    definition: {
      type: Type.STRING,
      description: "A brief definition of the harsh word in Indonesian."
    },
    category: {
      type: Type.STRING,
      description: "A brief category for the harsh word (e.g., Anger, Disappointment, Surprise)."
    },
    alternatives: {
      type: Type.ARRAY,
      description: "A list of 3 to 5 polite alternative expressions.",
      items: {
        type: Type.OBJECT,
        properties: {
          expression: { type: Type.STRING, description: "The polite alternative phrase." },
          context: { type: Type.STRING, description: "A brief context on when to use this expression." }
        },
        required: ["expression", "context"]
      }
    },
    advice: {
      type: Type.STRING,
      description: "A brief Islamic principle or advice related to avoiding the original harsh word."
    }
  },
  required: ["definition", "category", "alternatives", "advice"]
};

const scriptureSchema = {
    type: Type.OBJECT,
    properties: {
        type: { type: Type.STRING, description: "The type of scripture: 'Quran' or 'Hadith'." },
        text: { type: Type.STRING, description: "The full text of the verse or hadith in Indonesian." },
        source: { type: Type.STRING, description: "The source (e.g., 'QS. Al-Baqarah: 83' or 'HR. Bukhari & Muslim')." },
        explanation: { type: Type.STRING, description: "A brief, simple explanation of its relevance to the topic." }
    },
    required: ["type", "text", "source", "explanation"]
};

const storyAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        moral: { type: Type.STRING, description: "The moral lesson (hikmah) from the story related to Islamic communication." },
        scripture: scriptureSchema
    },
    required: ["moral", "scripture"]
}

export const getPoliteAlternatives = async (word: string): Promise<GeminiResponse> => {
    if (!API_KEY) {
        return new Promise(resolve => setTimeout(() => resolve({
            definition: "Ini adalah definisi tiruan untuk kata yang Anda cari karena API Key tidak tersedia.",
            category: "Contoh Kategori",
            alternatives: [
                { expression: "Contoh Jawaban 1", context: "Ini adalah jawaban tiruan karena API Key tidak tersedia." },
                { expression: "Contoh Jawaban 2", context: "Silakan atur environment variable API_KEY untuk hasil nyata." }
            ],
            advice: "Menggunakan kata-kata yang baik adalah cerminan dari hati yang bersih. Ini adalah nasihat tiruan."
        }), 1000));
    }
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analisis kata kasar dalam bahasa Indonesia "${word}". Pertama, berikan definisi kata tersebut dalam bahasa Indonesia. Kemudian, berikan 3-5 alternatif ungkapan yang santun. Pastikan beberapa alternatif menggunakan istilah Islami yang umum (misalnya, Masya Allah, Astaghfirullah, Qadarullah) jika relevan. Untuk setiap alternatif, berikan konteks penggunaannya. Selain itu, kategorikan secara ringkas jenis emosi atau situasi dari kata kasar "${word}" tersebut (contoh: Kemarahan, Kekecewaan, Kaget). Terakhir, sertakan satu nasihat singkat berdasarkan prinsip Islam tentang pentingnya menjaga lisan dan menghindari kata tersebut.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: politeAlternativesSchema,
        temperature: 0.7,
      },
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as GeminiResponse;
  } catch (error) {
    console.error("Error calling Gemini API for alternatives:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
};

export const findRelevantScripture = async (topic: string): Promise<IslamicQuote> => {
    if (!API_KEY) {
        return new Promise(resolve => setTimeout(() => resolve({
            type: "Quran",
            text: "Ini adalah contoh ayat yang relevan dengan topik Anda. (Jawaban Tiruan)",
            source: "QS. Mock: 1-2",
            explanation: "Karena API Key tidak tersedia, hasil ini adalah contoh. Atur API Key untuk mendapatkan jawaban asli dari AI."
        }), 1000));
    }

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Carikan satu ayat Al-Qur'an atau Hadits Shahih yang paling relevan dengan topik adab komunikasi dalam Islam berikut: "${topic}". Berikan teksnya dalam bahasa Indonesia, sumber yang jelas, dan penjelasan singkat yang mudah dipahami.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: scriptureSchema,
                temperature: 0.5,
            },
        });
        const jsonString = response.text.trim();
        return JSON.parse(jsonString) as IslamicQuote;
    } catch (error) {
        console.error("Error calling Gemini API for scripture:", error);
        throw new Error("Gagal menemukan dalil dari Gemini API.");
    }
};

export const analyzeStory = async (story: string): Promise<StoryAnalysisResult> => {
    if (!API_KEY) {
        return new Promise(resolve => setTimeout(() => resolve({
            moral: "Ini adalah contoh hikmah atau pelajaran dari cerita Anda. (Jawaban Tiruan)",
            scripture: {
                type: "Hadith",
                text: "Setiap perbuatan baik adalah sedekah. (Jawaban Tiruan)",
                source: "HR. Mock",
                explanation: "Karena API Key tidak tersedia, hasil ini adalah contoh. Atur API Key untuk mendapatkan jawaban asli dari AI."
            }
        }), 1500));
    }

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analisis cerita berikut ini dari sudut pandang adab komunikasi dalam Islam: "${story}". Apa hikmah (pelajaran moral) utama dari cerita tersebut? Kemudian, berikan satu ayat Al-Qur'an atau Hadits Shahih yang paling relevan dengan hikmah tersebut, lengkap dengan teks, sumber, dan penjelasannya.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: storyAnalysisSchema,
                temperature: 0.7,
            },
        });
        const jsonString = response.text.trim();
        return JSON.parse(jsonString) as StoryAnalysisResult;
    } catch (error) {
        console.error("Error calling Gemini API for story analysis:", error);
        throw new Error("Gagal menganalisis cerita dari Gemini API.");
    }
};