import React from 'react';
import './ArticleCard.css';
import { FaHeart, FaExternalLinkAlt, FaAlignJustify } from 'react-icons/fa';
import { Article } from '../ApiCommunicationHelpers/interfaces/Article';
import { categoryToImageMapping } from './CategoryToImageMapping';
import generic from '../Assets/categories/generic.png';

export function ArticleCard(props: { id: number, article: Article }) {
    let colourOverlayClass = '';
    let articleImage = '';
    const style = { "--animation-order": props.id } as React.CSSProperties;

    const authors: string = props.article.authors.join(', ');

    Object.keys(categoryToImageMapping).forEach(key => {
        const isImageNeeded = articleImage === '' && props.article.primaryCategory && props.article.primaryCategory.includes(key);
        if (isImageNeeded) {
            articleImage = categoryToImageMapping[key];
            colourOverlayClass = key;
        }
    });

    if (articleImage === '') {
        articleImage = generic;
        colourOverlayClass = 'econ';
    }

    return (
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
                <label title={authors} className="text-muted text-uppercase w-100 text-truncate">
                    {authors}
                </label>
                <h2>
                    {props.article.title}
                </h2>
            </div>
            <div className={"buttons-section " + colourOverlayClass}>
                <button className="button p-3">
                    <FaHeart />
                </button>
                <button className="button p-3">
                    <FaAlignJustify />
                </button>
                <a className="button p-3" href={props.article.pdfHref}>
                    <FaExternalLinkAlt />
                </a>
            </div>
        </div>
    );
}