import React from 'react';
import { ArticleCard } from '../UiElements/ArticleCard';
import { SearchBox } from '../UiElements/SearchBox';
import { parseArxivXml } from '../Helpers/parseArxivXml';
import { Article } from '../Helpers/interfaces/Article';
import { Loading } from '../UiElements/Loading';
import { Pagination } from '../UiElements/Pagination';

export class Search extends React.PureComponent {
    timeout: NodeJS.Timeout | null;
    state: { isLoaded: boolean, articles: Array<Article> | null };
    private selectedQuery = 'all';

    constructor(props: any) {
        super(props);
        this.timeout = null;
        this.state = {
            isLoaded: false,
            articles: null
        };
    }

    componentDidMount = () => this.getArticlesMatching("random");

    setSelectedQuery(value: string) {
        this.selectedQuery = value;
    }

    getArticlesMatching(searchValue: string) {
        this.setState({
            isLoaded: false,
            articles: null
        });

        const queryParams = `${this.selectedQuery}:%22${searchValue.split(' ').join('+')}%22`;
        fetch(`https://export.arxiv.org/api/query?search_query=${queryParams}`)
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
                <SearchBox parent={this} />
                {this.state.articles !== null
                    ?
                    <div className="articles-grid">
                        {
                            this.state.articles.map((article, index: number) =>
                                <div className="article" key={index}>
                                    <ArticleCard id={index} article={article} />
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