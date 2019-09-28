import React from 'react';
import './Search.css';
import { ArticleCard } from '../UiElements/ArticleCard';
import SearchBox from '../UiElements/SearchBox';
import { parseArxivXml } from '../ApiCommunicationHelpers/parseArxivXml';
import { Article } from '../ApiCommunicationHelpers/interfaces/Article';
import { FaTimesCircle } from 'react-icons/fa';
import { Loading } from '../UiElements/Loading';

export default class Search extends React.PureComponent {
    timeout: NodeJS.Timeout | null;
    state: { isLoaded: boolean, articles: Array<Article> | null, recentSearches: Array<string> };

    constructor(props: any) {
        super(props);
        this.timeout = null;
        this.state = {
            isLoaded: false,
            recentSearches: [],
            articles: null
        };
    }

    componentDidMount() {
        this.getArticlesMatching('science');
    }

    onSearchKeyUp(value: string) {
        if (this.timeout !== void 0 && this.timeout !== null) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.getArticlesMatching(value)
        }, 1000);
    }

    getArticlesMatching(searchValue: string) {
        this.state.recentSearches.unshift(searchValue);
        this.setState({
            isLoaded: false,
            articles: null
        });
        fetch("https://export.arxiv.org/api/query?search_query=all:" + searchValue)
            .then(res => res.text())
            .then(
                (result) => {
                    const articles = parseArxivXml(result).articles;
                    this.setState({
                        isLoaded: true,
                        articles: articles
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        articles: null
                    });
                }
            );
    }

    render() {
        return (
            <div>
                <div className="mb-3">
                    <SearchBox parent={this} />
                    <div className="d-flex flex-row align-items-center mt-2 overflow-auto">
                        <label className="text-muted m-0" style={{whiteSpace: 'nowrap'}}>
                            recent searches:
                        </label>
                        {this.state.recentSearches
                            ? this.state.recentSearches.map(search =>
                                <span className="recent-search-pill ml-2">
                                    {search} <FaTimesCircle />
                                </span>
                            ) : ''
                        }
                    </div>
                </div>
                {this.state.articles !== null
                    ?
                    <div className="row">
                        {
                            this.state.articles.map((article, index: number) =>
                                <div className="mb-5 col-lg-3 col-md-4 col-6">
                                    <ArticleCard key={index} id={index} article={article} />
                                </div>
                            )
                        }
                    </div>
                    :
                    <div className="d-flex justify-content-center mt-5">
                        {
                            this.state.isLoaded
                                ? <p>No results found</p>
                                : <span className="animate-spin"><Loading /></span>
                        }
                    </div>
                }
            </div>
        );
    }
}