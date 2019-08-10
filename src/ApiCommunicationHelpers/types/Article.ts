export interface Article {
    doi: string;
    published: string;
    author: Array<string>;
    title: string;
    summary: string;
    primaryCategory: string;
    secondaryCategories: Array<string>;
    pdfHref: string;
    journal?: string;
}
