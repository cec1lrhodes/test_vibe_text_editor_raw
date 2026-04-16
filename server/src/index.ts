import express from "express"
import cors from "cors"
import cardsRouter from "./routes/cards"
import articlesRouter from "./routes/articles"

const app = express()
const PORT = process.env.PORT ?? 3001

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:5173"]

const isOriginAllowed = (origin: string): boolean => {
  if (ALLOWED_ORIGINS.includes(origin)) return true
  if (/^https:\/\/.*\.vercel\.app$/.test(origin)) return true
  return false
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || isOriginAllowed(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`))
      }
    },
  }),
)
app.use(express.json({ limit: "10mb" }))

app.use("/api/cards", cardsRouter)
app.use("/api/articles", articlesRouter)

app.get("/health", (_req, res) => {
  res.json({ status: "ok" })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
