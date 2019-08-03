import React from 'react';
import './Search.css';
import ArticleCard from '../UiElements/ArticleCard';
import SearchBox from '../UiElements/SearchBox';
import Paginator from '../UiElements/Paginator';

export default class Search extends React.PureComponent {
    timeout = null;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            articles: []
        };
    }

    componentDidMount() {
        this.getArticlesMatching('science');
    }

    onSearchKeyUp(value) {
        if (this.timeout !== void 0 && this.timeout !== null) {
            clearTimeout(this.timeout);
        }

        const searchFunction = this.getArticlesMatching.bind(this);

        this.timeout = setTimeout(function () {
            searchFunction(value)
        }, 300);
    }

    getArticlesMatching(searchValue) {
        fetch("https://export.arxiv.org/api/query?search_query=all:" + searchValue)
            .then(res => res.text())
            .then(
                (result) => {
                    const parser = require('fast-xml-parser');

                    const articles = parser.parse(result);
                    this.setState({
                        isLoaded: true,
                        articles: articles.feed.entry
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        return (
            <div>
                <div className="mb-3">
                    <SearchBox parent={this} />
                </div>
                <div className="d-flex flex-row justify-content-center flex-wrap">
                    {this.state.articles
                        ? this.state.articles.map((article, index) =>
                            <ArticleCard id={index} article={article} />
                        ) : <div className="text-center">
                            <h2>
                                Nothing to see here governor!
                            </h2>
                        </div>}
                </div>
                <div >
                    <Paginator />
                </div>
            </div>
        );
    }
}