import express from "express"
import cors from "cors"
import cardsRouter from "./routes/cards"
import articlesRouter from "./routes/articles"

const app = express()
const PORT = 3001

app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json({ limit: "10mb" }))

app.use("/api/cards", cardsRouter)
app.use("/api/articles", articlesRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
