import React from 'react';
import { Article } from "../Helpers/interfaces/Article";
import './ArticleDetailsModal.css';
import { FaTimesCircle } from 'react-icons/fa';

export const ArticleDetailsModal = (props: { close: any, article: Article }) => {
    return (
        <div className="darken-background actually-darken">
            <div className="inner-modal">
                <div className="even-spaced-row">
                    <h2 className="margin-right">
                        {props.article.title}
                    </h2>
                    <span role="button" className="modal-close" onClick={() => props.close(false)}>
                        <FaTimesCircle />
                    </span>
                </div>
                <div className="margin-bottom">
                    <label>
                        {props.article.journal}
                    </label>
                </div>
                <p className="margin-bottom">
                    {props.article.summary}
                </p>
                <div className="even-spaced-row">
                    <label className="margin-right">
                        {new Date(props.article.published).toLocaleDateString()}
                    </label>
                    <label className="author" title={props.article.authors.join(', ')}>
                        {props.article.authors.join(', ')}
                    </label>
                </div>
            </div>
        </div>
    );
}