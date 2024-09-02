import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const app = express();
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

// Configure dotenv to load variables from the .env file
dotenv.config();

// Body Parser middleware
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
// Cookie parser middleware
app.use(cookieParser());

//Connect to database
connectToMongoDB();

//SET UP PORT:
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  //root route http://localhost:5000/
  res.send("Hello World!!");
});

//Middleware
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
