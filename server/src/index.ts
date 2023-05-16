import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./Config/DB"
import userRoute from './Routes/userRoute'
import { notFound, errorHandler } from "./Middleware/errorMiddleware"

dotenv.config()
ConnectDB()
const app = express()
app.use(express.json())

app.use("/api/user", userRoute)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})