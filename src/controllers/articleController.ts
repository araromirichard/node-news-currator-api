import { Request, Response, NextFunction, RequestHandler } from "express";
import prisma from "../prisma/client";
import { ArticleFactory } from "../factories/articleFactory";

// Get all articles
export const getAllArticles: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    //add pagination variables
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        skip,
        take: limit,
        orderBy: {
          id: "desc",
        },
      }),
      prisma.article.count(),
    ]);
    const totalPages = Math.ceil(total / limit);
    res.json({
      messassage: "Articles retrieved successfully",
      data: {
        articles,
        metadata: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a single article by ID
export const getArticleById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const article = await prisma.article.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    await prisma.article.update({
      where: { id: article.id },
      data: { views: article.views + 1 }, // Increment views
    });

    res.json({
      message: "Article Retrieved successfully",
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new article
export const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, content, url } = req.body;
    const newArticleData = ArticleFactory.createArticle({
      title,
      content,
      url,
    });

    const newArticle = await prisma.article.create({
      data: newArticleData,
    });

    res.status(201).json({
      message: "Article created successfully",
      article: newArticle,
    });
  } catch (error) {
    next(error);
  }
};

// Record a click on an article
export const recordClick = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const article = await prisma.article.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    await prisma.article.update({
      where: { id: article.id },
      data: { clicks: article.clicks + 1 }, // Increment clicks
    });

    res.json(article);
  } catch (error) {
    next(error);
  }
};
