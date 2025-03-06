import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import articleRoutes from "./routes/articleRoutes";
import { errorHandler } from "./utils/errorHandler";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

// Apply rate limiting to all requests
app.use(limiter);

// Other middleware
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet());

// Body Parser middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Morgan logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Set Content-Type header for all responses
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});


// Health check route
app.get("/api/v1/health", (req, res) => {
  res.status(200).send("OK");
});

// Routes
app.use("/api/v1/articles", articleRoutes);

// Error handling middleware for unmatched routes
app.all('*', (req, res) => {
  res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed for ${req.originalUrl}`
  });
});


// Error handling
app.use(errorHandler);

export default app;
