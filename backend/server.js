const express = require("express");
const connectDB = require("./Config/db");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth",authRoutes);
app.use("/api/post",postRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 8005
app.listen("8005", () => {
    console.log(`Server is running on port ${PORT}`);
});