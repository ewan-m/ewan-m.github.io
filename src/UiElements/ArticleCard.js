import React, { useState } from 'react';
import './ArticleCard.css';
import { FaChevronCircleDown } from 'react-icons/fa';
import physics from '../Assets/physics.jpg';

function ArticleCard(props) {
    const [open, setOpen] = useState(false);

    let title, summary, journal, author, published = '';

    if (props.article !== void 0) {
        title = props.article.title;
        summary = props.article.summary;
        journal = props.article['arxiv:comment'];

        if (Array.isArray(props.article.author)) {
            author = props.article.author.map(author => author.name).join(', ')
        } else {
            author = props.article.author.name;
        }

        published = new Date(props.article.updated).toLocaleDateString();
    }

    return (
        <div className="shadow-sm a4-paper-dimensions h-100">
            <img src={physics} width="100%" />
            <div className="text-center p-2 d-flex flex-column justify-content-between">
                <label className="text-muted text-uppercase w-100 text-truncate">
                    {author}
                </label>
                <h2 className="h6">
                    {title}
                </h2>
                {open && <div className="text-left">
                    <p>
                        {summary}
                    </p>
                    <div className="d-flex flex-row justify-content-between">
                        <label className="font-italic">
                            {journal}
                        </label>
                        <label className="text-muted">
                            {published}
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

export default ArticleCard;