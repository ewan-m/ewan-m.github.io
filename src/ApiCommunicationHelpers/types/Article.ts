export interface Article {
    published: string;
    authors: Array<string>;
    title: string;
    summary: string;
    primaryCategory: string;
    secondaryCategories: Array<string>;
    pdfHref: string;
    doi?: string;
    journal?: string;
}
