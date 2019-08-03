import React from 'react';
import './Search.css';
import ArticleCard from '../UiElements/ArticleCard';
import SearchBox from '../UiElements/SearchBox';

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
                <div className="d-flex flex-row mb-3">
                    <SearchBox parent={this} />
                </div>
                <div className="row d-flex align-content-stretch flex-wrap">
                    {this.state.articles
                        ? this.state.articles.map((article, index) =>
                            <div key={index} className="h-100 col-lg-6 mb-3">
                                <ArticleCard id={index} article={article} />
                            </div>
                        ) : <div className="col-lg-12">
                            Nothing to see here governor!
                        </div>}
                </div>
            </div>
        );
    }
}