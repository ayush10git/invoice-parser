import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import cors from "cors";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

// Initialize Express
const app = express();
const port = process.env.PORT || 5000;

// CORS setup for development
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust as needed for your frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Google Generative AI setup
const genAI = new GoogleGenerativeAI("AIzaSyCBxrlWT_VFqHexmzWjJ71XgThckvFzCys");
const fileManager = new GoogleAIFileManager("AIzaSyCBxrlWT_VFqHexmzWjJ71XgThckvFzCys");

// Directory setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer storage setup
const uploadDir = path.join(__dirname, "/uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// File upload route
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const filePath = path.join(uploadDir, req.file.filename);

  try {
    console.log("Uploading file to Google Generative AI...");
    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType: req.file.mimetype,
      displayName: req.file.originalname,
    });

    // Clean up local file after upload
    fs.unlinkSync(filePath);
    console.log(`File uploaded successfully: ${uploadResponse.file.uri}`);
    res.json({ fileUri: uploadResponse.file.uri });
  } catch (error) {
    console.error("File upload failed:", error);
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
});

// Content generation route
app.post("/generate-content", express.json(), async (req, res) => {
  const { fileUri, prompt } = req.body;
  if (!fileUri || !prompt)
    return res
      .status(400)
      .json({ message: "File URI and prompt are required" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("Generating content...");

    const result = await model.generateContent([
      { fileData: { mimeType: "application/pdf", fileUri } },
      { text: prompt },
    ]);

    res.json({ generatedContent: result.response.text() });
  } catch (error) {
    console.error("Content generation failed:", error);
    res
      .status(500)
      .json({ message: "Content generation failed", error: error.message });
  }
});

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
