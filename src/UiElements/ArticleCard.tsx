import React from 'react';
import './ArticleCard.css';
import { FaHeart, FaExternalLinkAlt, FaAlignJustify } from 'react-icons/fa';
import { Article } from '../ApiCommunicationHelpers/models/Article';
import { categoryToImageMapping } from './CategoryToImageMapping';

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

    return (
        <div className="shadow animate-in h-100 border-radius-bottom d-flex flex-column justify-content-between" style={style}>
            <div className="w-100 position-relative">
                <img alt="category" className="grayscale-image" src={articleImage} width="50%" />
                <div className={"d-flex flex-column align-items-center justify-content-center colour-overlay " + colourOverlayClass}>
                    <label className="category-label">
                        {props.article.primaryCategory}
                    </label>
                </div>
            </div>
            <div className="text-center p-2">
                <label title={authors} className="text-muted text-uppercase w-100 text-truncate">
                    {authors}
                </label>
                <h2 className="h6">
                    {props.article.title}
                </h2>
            </div>
            <div className={"p-3 border-radius-bottom px-5 d-flex flex-row justify-content-between white-icons " + colourOverlayClass}>
                <FaHeart />
                <FaAlignJustify />
                <a style={{ marginTop: "-5px" }} href={props.article.pdfHref}>
                    <FaExternalLinkAlt />
                </a>
            </div>
        </div>
    );
}