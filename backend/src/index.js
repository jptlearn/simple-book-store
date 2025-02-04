import express from "express";
import cors from "cors";
import "dotenv/config";
import sequelize from "./models/index.js";
import bookRoutes from "./routes/book.route.js";
import { limiter, securityMiddleware } from "./middlewares/security.middleware.js";

const app = express();

app.use(limiter);
securityMiddleware.forEach(middleware => app.use(middleware));

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.use(express.static("./public/uploads/"));
app.use("/book", bookRoutes);

app.listen(process.env.PORT, async () => {
  console.log("Server is running in port 8000...🚀");
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false, alter: true });
    console.log("Database connected successfully!!");
  } catch (error) {
    console.error("Error during database connection.", error);
  }
});
