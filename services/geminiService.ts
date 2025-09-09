
import { GoogleGenAI } from "@google/genai";
import { COMPANY_BRIEF_PROMPT_TEMPLATE } from '../constants';
import type { CompanyBrief } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Cleans the raw text response from the Gemini API.
 * It removes markdown code block fences (```json ... ```) if they exist.
 * @param text The raw text from the API.
 * @returns A clean string ready for JSON parsing.
 */
function cleanJsonString(text: string): string {
    const trimmedText = text.trim();
    if (trimmedText.startsWith('```json') && trimmedText.endsWith('```')) {
        return trimmedText.substring(7, trimmedText.length - 3).trim();
    }
    if (trimmedText.startsWith('```') && trimmedText.endsWith('```')) {
        return trimmedText.substring(3, trimmedText.length - 3).trim();
    }
    return trimmedText;
}

export const generateCompanyBrief = async (companyName: string): Promise<CompanyBrief> => {
    if (!companyName) {
        throw new Error('Company name cannot be empty.');
    }

    try {
        const prompt = COMPANY_BRIEF_PROMPT_TEMPLATE.replace(/{company_name}/g, companyName);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                // Use Google Search for up-to-date, verifiable information
                tools: [{ googleSearch: {} }],
            },
        });

        const rawText = response.text;
        if (!rawText) {
            throw new Error('API returned an empty response.');
        }

        const cleanedJson = cleanJsonString(rawText);

        try {
            const parsedJson: CompanyBrief = JSON.parse(cleanedJson);
            return parsedJson;
        } catch (parseError) {
            console.error("Failed to parse JSON:", cleanedJson);
            throw new Error("The AI returned an invalid JSON format. Please try again.");
        }

    } catch (error) {
        console.error('Error generating company brief:', error);
        // Re-throw a more user-friendly error
        throw new Error(`Failed to generate brief for ${companyName}. The API may be unavailable or the request failed.`);
    }
};
