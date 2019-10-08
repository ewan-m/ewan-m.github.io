import { Article } from "./interfaces/Article";

export const favouriteArticles = {
    get: (): Array<Article> =>
        JSON.parse(localStorage.getItem('favourite-articles') || '[]'),

    set: (favourites: Array<Article>) =>
        localStorage.setItem('favourite-articles', JSON.stringify(favourites)),

    isFavourite: (article: Article): boolean =>
        favouriteArticles.get().some(fav => fav.pdfHref === article.pdfHref)
};
