import { Article } from '@prisma/client';

// Factory class to create Article instances
export class ArticleFactory {
  static createArticle(data: Partial<Article>): Article {
    return {
      title: data.title || '',
      content: data.content || '',
      url: data.url || '',
      views: 0,
      clicks: 0,
    } as Article;
  }
}