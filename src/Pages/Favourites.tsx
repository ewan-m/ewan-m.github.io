import React from 'react';
import { ArticleCard } from '../UiElements/ArticleCard';
import { Article } from '../Helpers/interfaces/Article';
import { Pagination } from '../UiElements/Pagination';
import { favouriteArticles } from '../Helpers/favouriteArticles';

export class Favourites extends React.PureComponent {
    articles: Array<Article> = favouriteArticles.get();

    render() {
        return (
            <div className="inner-page-padding">
                {this.articles.length > 0
                    ?
                    <div className="articles-grid">
                        {
                            this.articles.map((article, index: number) =>
                                <div className="article">
                                    <ArticleCard key={index} id={index} article={article} />
                                </div>
                            )
                        }
                    </div>
                    :
                    <div className="loading-not-found-container">
                        {
                            <p>
                                You haven't favourited any articles
                            </p>
                        }
                    </div>
                }
                <Pagination />
            </div>
        );
    }
}