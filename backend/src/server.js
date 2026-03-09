import express from "express";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employeeRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"])
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

// Routes
app.use('/employees', employeeRoutes);

// Database Connection
connectDB();

app.listen(port, () => {
    console.log(`http://localhost:${port}/employees`);
});
