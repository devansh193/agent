import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";

interface UploadedFile {
  file: File;
  fileName: string;
  tempFilePath: string;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const uploadedFiles = formData.getAll("FILE");

    if (!uploadedFiles || uploadedFiles.length === 0) {
      return NextResponse.json({ error: "No files found." }, { status: 404 });
    }

    const uploadedFile = uploadedFiles[0];

    if (!(uploadedFile instanceof File)) {
      return NextResponse.json(
        { error: "Uploaded file is not in the expected format." },
        { status: 400 }
      );
    }

    const { file, fileName, tempFilePath } = await saveUploadedFile(
      uploadedFile
    );
    console.log("Uploaded file:", file);
    const parsedText = await parsePdfFile(tempFilePath);
    await fs.unlink(tempFilePath); // Clean up the temporary file
    const response = NextResponse.json({ parsedText });
    response.headers.set("FileName", fileName);

    console.log(response);
    return response;
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

async function saveUploadedFile(file: File): Promise<UploadedFile> {
  const fileName = `${uuidv4()}.pdf`;
  const tempFilePath = `/tmp/${fileName}`;
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(tempFilePath, fileBuffer);

  return { file, fileName, tempFilePath };
}

async function parsePdfFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfParser = new (PDFParser as any)(null, 1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdfParser.on("pdfParser_dataError", (errData: any) => {
      reject(new Error(`PDF parsing error: ${errData.parserError}`));
    });

    pdfParser.on("pdfParser_dataReady", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsedText = (pdfParser as any).getRawTextContent();
      resolve(parsedText);
    });

    pdfParser.loadPDF(filePath);
  });
}
