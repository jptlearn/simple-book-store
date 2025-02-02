import express from "express";
import "dotenv/config";
import sequelize from "./models/index.js";
import bookRoutes from "./routes/book.route.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Backend is working")
})

app.use(express.static("./public/uploads/"))
app.use("/book", bookRoutes);

app.listen(process.env.PORT, async () => {
  console.log("Server is running in port 8000...🚀")
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false, alter: true })
    console.log("Database connected successfully!!");
  } catch (error) {
    console.error("Error during database connection.", error)
  }
})