import React, { useState } from 'react';
import './ArticleCard.css';
import { FaChevronUp } from 'react-icons/fa';
import Collapse from 'react-bootstrap/Collapse';

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
        <div className="card shadow-sm h-100">
            <div className="card-header">
                <h5 className="card-title">
                    <a href="#collapse" className="d-flex justify-content-between" onClick={() => setOpen(!open)}>
                        {title}
                        <span className="ml-3">
                            <FaChevronUp />
                        </span>
                    </a>
                </h5>
            </div>
            <Collapse in={open}>
                <div>
                    <div className="card-body">
                        <p className="card-text">
                            {summary}
                        </p>
                        <p >
                            {journal}
                        </p>
                    </div>
                </div>
            </Collapse>
            <div className="card-footer text-muted">
                <div className="d-flex flex-row justify-content-between">
                    <span className="text-truncate" style={{ maxWidth: '50%' }}>
                        {author}
                    </span>
                    <span>
                        {published}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ArticleCard;
