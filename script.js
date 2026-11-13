
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = process.env.PORT || 10000;

const allowedOrigins = (process.env.SITE_URL || "")
  .split(",")
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("Origine non autorisée"));
  }
}));

app.use(express.json({ limit: "20kb" }));

app.use("/api/", rateLimit({
  windowMs: 60 * 1000,
  max: 20
}));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("TeknoAI API fonctionne !");
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Écris une question."
      });
    }

    if (message.length > 4000) {
      return res.status(400).json({
        error: "Message trop long."
      });
    }

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-6-astra",
      instructions:
        "Tu es TeknoAI, un assistant intelligent francophone. " +
        "Tu aides les utilisateurs à apprendre, créer, programmer, " +
        "faire des recherches et développer leurs projets. " +
        "Réponds clairement et pédagogiquement.",
      input: message.trim()
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("Erreur TeknoAI :", error.message);

    res.status(500).json({
      error: "TeknoAI rencontre un problème. Réessaie plus tard."
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`TeknoAI serveur démarré sur le port ${PORT}`);
});
