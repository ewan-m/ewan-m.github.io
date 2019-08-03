import React, { useState } from 'react';
import './ArticleCard.css';
import { FaChevronRight } from 'react-icons/fa';

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
        <div className="m-2 shadow-sm">
            <div className="d-flex flex-row">
                <div className="a4-paper-dimensions p-2 flex-shrink-0 d-flex flex-column justify-content-between" onClick={() => setOpen(!open)}>
                    <h2 className="h6 text-center">
                        {title}
                    </h2>
                    <div className="expand-icon-container d-flex flex-row flex-row-reverse">
                        <span className={open ? "hover-icon rotated" : "hover-icon"}>
                            <FaChevronRight />
                        </span>
                    </div>
                    <p className="text-truncate text-center w-100">
                        {author}
                    </p>
                </div>
                {open && <div className="a4-paper-height p-2">
                    <label className="d-flex flex-row justify-content-between">
                        <span className="font-weight-bold">
                            {journal}
                        </span>
                        <span className="text-muted">
                            {published}
                        </span>
                    </label>
                    <hr></hr>
                    <p>
                        {summary}
                    </p>
                </div>}
            </div>
        </div>
    );
}

export default ArticleCard;