import { Router } from "express";
import {
  getAllArticles,
  getArticleById,
  createArticle,
  recordClick,
} from "../controllers/articleController";
import { validateArticle } from "../middlewares/validate";

const router = Router();

// Define routes for article operations
router.get("/", getAllArticles); // Get all articles
router.get("/:id", getArticleById); // Get article by ID
router.post("/", validateArticle, createArticle); // Create a new article
router.post("/:id/click", recordClick); // Record a click on an article

export default router;
