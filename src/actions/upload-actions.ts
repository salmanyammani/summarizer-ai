"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryArgumentType {
    userId?: string;
    fileUrl: string;
    summary: string;
    title: string;
    fileName: string;
}

export async function generatePdfSummary(uploadResponse: [{
    serverData: {
        userId: string;
        file: {
            ufsUrl: string;
            name: string;
        };
    }
}]) {
    if (!uploadResponse) {
        return {
            success: false,
            message: "File Upload Failed",
            data: null,
        }
    }
    const { serverData: {
        userId,
        file: { ufsUrl: pdfUrl, name: fileName },
    } } = uploadResponse[0];
    if (!pdfUrl) {
        return {
            success: false,
            message: "PDF upload failed",
            data: null,
        }
    }

    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl);

        // Check if PDF is empty
        if (!pdfText || pdfText.trim().length === 0) {
            return {
                success: false,
                message: "The PDF you provided doesn't contain any text. Please upload a PDF with readable text content.",
                data: null,
            }
        }

        let summary;
        try {
            summary = await generateSummaryFromGemini(pdfText)
        }
        catch (geminiError) {
            console.error(
                "Gemini API Failed",
                geminiError
            )
            throw new Error("Failed to generate Summary")
        }
        const formattedFileName = formatFileNameAsTitle(fileName);
        return {
            success: true,
            message: "PDF processed successfully",
            data: {
                title: formattedFileName,
                summary,
                fileUrl: pdfUrl,
                fileName
            },
        }
    }
    catch (error) {
        console.error("Error processing PDF:", error);
        return {
            success: false,
            message: "PDF processing failed",
            data: null,
        }
    }
}

export async function savePdfSummary({ userId, fileUrl, summary, title, fileName }: PdfSummaryArgumentType) {
    try {
        const sql = await getDbConnection();

        const result = await sql`
            INSERT INTO pdf_summaries (
                user_id,
                original_file_url,
                summary_text,
                title,
                file_name
            ) VALUES (
                ${userId},
                ${fileUrl},
                ${summary},
                ${title},
                ${fileName}
            ) RETURNING id
        `;

        // Return success and inserted ID
        return { success: true, id: result[0].id };
    } catch (error) {
        console.log(error, "Error Saving PDF summary")
        throw error;
    }
}

export async function storePdfSummaryAction({ fileUrl, summary, title, fileName }: PdfSummaryArgumentType) {
    //user is logged in and has a user ID
    let savedSummary;
    try {
        const { userId } = await auth();
        if (!userId) {
            return {
                success: false,
                message: "User Not Found"
            }
        }
        savedSummary = await savePdfSummary({
            userId,
            fileUrl,
            summary,
            title,
            fileName
        });
        if (!savedSummary) {
            return {
                success: false,
                message: "Failed to save pdf summary :( Please try again"
            }
        }
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error ? error.message : "Error Saving PDF Summary",
        }
    }
    revalidatePath(`/summaries/${savedSummary.id}`)
    return {
        success: true,
        message: "PDF Summary Saved Successfully",
        data: {
            id: savedSummary.id,
        }
    }
}