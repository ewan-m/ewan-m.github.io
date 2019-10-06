import React from 'react';
import './Search.css';
import { ArticleCard } from '../UiElements/ArticleCard';
import { SearchBox } from '../UiElements/SearchBox';
import { parseArxivXml } from '../ApiCommunicationHelpers/parseArxivXml';
import { Article } from '../ApiCommunicationHelpers/interfaces/Article';
import { Loading } from '../UiElements/Loading';
import { Pagination } from '../UiElements/Pagination';

export default class Search extends React.PureComponent {
    timeout: NodeJS.Timeout | null;
    state: { isLoaded: boolean, articles: Array<Article> | null };

    constructor(props: any) {
        super(props);
        this.timeout = null;
        this.state = {
            isLoaded: false,
            articles: null
        };
    }


    getArticlesMatching(searchValue: string) {
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
            <div className="inner-page-padding">
                <SearchBox parent={this}/>
                {this.state.articles !== null
                    ?
                    <div className="articles-grid">
                        {
                            this.state.articles.map((article, index: number) =>
                                <div className="article">
                                    <ArticleCard key={index} id={index} article={article} />
                                </div>
                            )
                        }
                    </div>
                    :
                    <div className="loading-not-found-container">
                        {
                            this.state.isLoaded
                                ? <p>No results found</p>
                                : <Loading />
                        }
                    </div>
                }
                <Pagination />
            </div>
        );
    }
}