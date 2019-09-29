import React from 'react';
import './Search.css';
import { ArticleCard } from '../UiElements/ArticleCard';
import { SearchBox } from '../UiElements/SearchBox';
import { parseArxivXml } from '../ApiCommunicationHelpers/parseArxivXml';
import { Article } from '../ApiCommunicationHelpers/interfaces/Article';
import { Loading } from '../UiElements/Loading';

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
            <div>
                <SearchBox parent={this}/>
                {this.state.articles !== null
                    ?
                    <div className="row">
                        {
                            this.state.articles.map((article, index: number) =>
                                <div className="mb-5 col-lg-3 col-md-4 col-12">
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