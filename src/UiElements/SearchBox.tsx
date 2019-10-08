import React from 'react';
import './SearchBox.css';
import { FaTimesCircle } from 'react-icons/fa';

interface Parent {
    parent: any;
}

export class SearchBox extends React.PureComponent<Parent> {
    constructor(props: Parent) {
        super(props);

        this.state = {
            recentSearches: [],
        };
        this.timeout = null;
    }
    state: { recentSearches: Array<string> };
    private timeout: NodeJS.Timeout | null;
    private updateSearches = (arr: Array<string>) => {
        this.setState({ recentSearches: [] });
        setTimeout(() => this.setState({ recentSearches: arr }), 2);
    }

    onSearchKeyUp = (value: string) => {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
        }

        if (value) {
            this.timeout = setTimeout(() => {
                this.updateSearches([value, ...this.state.recentSearches]);
                this.props.parent.getArticlesMatching(value)
            }, 1000);
        }
    }

    removeSearch = (index: number) => {
        const immutableCopy: Array<string> = JSON.parse(JSON.stringify(this.state.recentSearches));
        immutableCopy.splice(index, 1);
        this.updateSearches(immutableCopy);
    }

    render() {
        return (
            <div>
                <form className="searching-form">
                    <select className="input-inline" onChange={(e) => this.props.parent.setSelectedQuery(e.target.value)}>
                        <option value="all">All fields</option>
                        <option value="ti">Title</option>
                        <option value="au">Author</option>
                        <option value="abs">Abstract</option>
                        <option value="co">Comments</option>
                        <option value="jr">Journal reference</option>
                        <option value="rn">Report number</option>
                        <option value="cat">Category</option>
                    </select>
                    <input
                        placeholder="Search"
                        aria-label="Search for articles"
                        className="input-inline"
                        onChange={(event: any) => this.onSearchKeyUp(event.target.value)}
                    />
                </form>
                {this.state.recentSearches.length > 0
                    &&
                    <div className="recent-searches-row">
                        <label className="recent-searches-label">
                            recent searches:
                        </label>
                        {this.state.recentSearches.map((search, index) =>
                            <label key={index} className="recent-search-pill" onClick={e => this.removeSearch(index)}>
                                <span onClick={e => this.onSearchKeyUp(search)} className="trigger-search">
                                    {search}
                                </span>
                                <span role="button" className="delete-search">
                                    <FaTimesCircle />
                                </span>
                            </label>
                        )}
                    </div>
                }
            </div>
        );
    }
}
