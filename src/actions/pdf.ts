"use server";
import pdfParse from "pdf-parse";

export const parsePDF = async (buffer: Buffer) => {
  try {
    const pdfData = await pdfParse(buffer);
    return pdfData;
  } catch (error) {
    throw new Error(`PDF Parsing Error: ${(error as Error).message}`);
  }
};
