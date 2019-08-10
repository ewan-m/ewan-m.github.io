import { Article } from './Article';

export interface ParsedResponse {
    currentPage: number;
    articlesPerPage: number;
    totalArticles: number;
    articles?: Array<Article>;
}