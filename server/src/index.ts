import express from "express"
import cors from "cors"
import cardsRouter from "./routes/cards"
import articlesRouter from "./routes/articles"

const app = express()
const PORT = process.env.PORT ?? 3001

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:5173"]

app.use(cors({ origin: ALLOWED_ORIGINS }))
app.use(express.json({ limit: "10mb" }))

app.use("/api/cards", cardsRouter)
app.use("/api/articles", articlesRouter)

app.get("/health", (_req, res) => {
  res.json({ status: "ok" })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
