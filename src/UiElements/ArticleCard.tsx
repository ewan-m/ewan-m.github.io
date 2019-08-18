import React, { useState } from 'react';
import './ArticleCard.css';
import { FaChevronCircleDown } from 'react-icons/fa';
import biology from '../Assets/categories/biology.jpg';
import computerscience from '../Assets/categories/computerscience.jpg';
import economics from '../Assets/categories/economics.jpg';
import electricalengineering from '../Assets/categories/electricalengineering.jpg';
import finance from '../Assets/categories/finance.jpg';
import mathematics from '../Assets/categories/mathematics.jpg';
import physics from '../Assets/categories/physics.jpg';
import statistics from '../Assets/categories/statistics.jpg';
import { Article } from '../ApiCommunicationHelpers/models/Article';

export function ArticleCard(props: { id: number, article: Article }) {
    const [open, setOpen] = useState(false);
    let colourOverlayClass = '';
    let articleImage = '';

    const authors: string = props.article.authors.join(', ');

    const categoryToImageMapping: { [key: string]: string }
        = {
        'physics': physics,
        'ph': physics,
        'bio': biology,
        'cs': computerscience,
        'econ': economics,
        'eess': electricalengineering,
        'fin': finance,
        'math': mathematics,
        'stat': statistics
    };

    Object.keys(categoryToImageMapping).forEach(key => {
        if (props.article.primaryCategory.includes(key) && articleImage === '') {
            articleImage = categoryToImageMapping[key];
            colourOverlayClass = key;
        }
    });

    return (
        <div className="shadow h-100">
            <div className="w-100 position-relative">
                <img className="grayscale-image" src={articleImage} width="100%" />
                <div className={"d-flex flex-column align-items-center justify-content-center colour-overlay " + colourOverlayClass}>
                    <label className="category-label">{props.article.primaryCategory}</label>
                </div>
            </div>
            <div className="text-center p-2 d-flex flex-column justify-content-between">
                <label title={authors} className="text-muted text-uppercase w-100 text-truncate">
                    {authors}
                </label>
                <h2 className="h6">
                    {props.article.title}
                </h2>
                {open && <div className="text-left">
                    <p>
                        {props.article.summary}
                    </p>
                    <div className="d-flex flex-row justify-content-between">
                        <label className="font-italic">
                            {props.article.journal}
                        </label>
                        <label className="text-muted">
                            {props.article.published}
                        </label>
                    </div>
                </div>
                }
                <div className="w-100 d-flex justify-content-center" onClick={() => setOpen(!open)}>
                    <FaChevronCircleDown className="text-muted" />
                </div>
            </div>
        </div>
    );
}