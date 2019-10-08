import React, { useState } from 'react';
import './ArticleCard.css';
import { FaHeart, FaExternalLinkAlt, FaAlignJustify } from 'react-icons/fa';
import { Article } from '../Helpers/interfaces/Article';
import { categoryToImageMapping } from './CategoryToImageMapping';
import generic from '../Assets/categories/generic.png';
import { favouriteArticles } from '../Helpers/favouriteArticles';
import { ArticleDetailsModal } from './ArticleDetailsModal';

export const ArticleCard = (props: { id: number, article: Article }) => {
    let colourOverlayClass = '';
    let articleImage = '';
    const style = { "--animation-order": props.id } as React.CSSProperties;

    const [isFavourited, setFavourited] = useState(favouriteArticles.isFavourite(props.article));
    const [isShowingDetails, setShowDetails] = useState(false);

    const authors: string = props.article.authors.join(', ');

    Object.keys(categoryToImageMapping).forEach(key => {
        const isImageNeeded = articleImage === ''
            && props.article.primaryCategory
            && props.article.primaryCategory.includes(key);

        if (isImageNeeded) {
            articleImage = categoryToImageMapping[key];
            colourOverlayClass = key;
        }
    });

    if (articleImage === '') {
        articleImage = generic;
        colourOverlayClass = 'econ';
    }

    const favourite = () => {
        let favourites: Array<Article> = favouriteArticles.get();

        if (favouriteArticles.isFavourite(props.article)) {
            favourites = favourites.filter(fav => fav.pdfHref !== props.article.pdfHref)
        } else {
            favourites.unshift(props.article);
        }

        favouriteArticles.set(favourites);
        setFavourited(!isFavourited);
    }

    return (
        <>
            <div className="article-card-container animate-in" style={style}>
                <div className="image-category-section">
                    <img alt="category" src={articleImage} />
                    <div className={"colour-overlay " + colourOverlayClass}>
                        <label className="category-label">
                            {props.article.primaryCategory}
                        </label>
                    </div>
                </div>
                <div className="author-title-section">
                    <h2>
                        {props.article.title}
                    </h2>
                    <label title={authors}>
                        {authors}
                    </label>
                </div>
                <div className={"buttons-section " + colourOverlayClass}>
                    <button onClick={() => favourite()} className={isFavourited ? 'button fav' : 'button'}>
                        <FaHeart />
                    </button>
                    <button className="button" onClick={() => setShowDetails(!isShowingDetails)}>
                        <FaAlignJustify />
                    </button>
                    <a className="button" href={props.article.pdfHref}>
                        <FaExternalLinkAlt />
                    </a>
                </div>
            </div>
            {isShowingDetails && <ArticleDetailsModal close={setShowDetails} article={props.article} />}
        </>
    );
}