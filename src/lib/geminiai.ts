import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts"
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' })


export const generateSummaryFromGemini = async (pdfText: string) => {
    try {
    //     const prompt = `${SUMMARY_SYSTEM_PROMPT}\n\n Transform this document into an engaging, easy-to-read summary with contextually 
    //   relevent emojis and proper markdown formatting: \n\n${pdfText}`
      const prompt  = [
        {
          role: "user",
          parts: [
            { text: SUMMARY_SYSTEM_PROMPT }       // e.g. “You are a social media content expert…” 
          ]
        },
        {
          role: "user",
          parts: [
            {
              text: 
                "Transform this document into an engaging, easy-to-read summary with multiple relevent emojis and given formatting rules:" +
                "with contextually relevant emojis and proper Markdown formatting and bullet points:" + pdfText
            },                    // the PDF text payload
          ]
        }
      ];

        const result = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
            config: {
                maxOutputTokens: 1500,
                temperature: 0.7,
            },
        });
        if (!result?.candidates?.[0]?.content?.parts?.[0]?.text) {
            throw new Error('No response from Gemini API');
        }
        return result.candidates[0].content.parts[0].text;
    } catch (error: any) {
        // if (error?.status === 429) {
        //     throw new Error('RATE_LIMITS_EXCEEDED')
        // }
        console.error("Gemini API Error", error);
        throw error;
    }
}