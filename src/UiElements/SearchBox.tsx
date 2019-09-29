import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './SearchBox.css';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';

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
            <div className="mb-3">
                <InputGroup>
                    <Form.Group className="mb-0 mr-2">
                        <Form.Control as="select" default="all">
                            <option value="all">All fields</option>
                            <option value="title">Title</option>
                            <option value="author">Author</option>
                            <option value="abstract">Abstract</option>
                            <option value="comments">Comments</option>
                            <option value="journal_ref">Journal reference</option>
                            <option value="acm_class">ACM classification</option>
                            <option value="msc_class">MSC classification</option>
                            <option value="report_num">Report number</option>
                            <option value="paper_id">arXiv identifier</option>
                            <option value="doi">DOI</option>
                            <option value="orcid">ORCID</option>
                            <option value="author_id">arXiv author ID</option>
                            <option value="help">Help pages</option>
                            <option value="full_text">Full text</option>
                        </Form.Control>
                    </Form.Group>
                    <FormControl
                        placeholder="Search"
                        aria-label="Search for articles"
                        onChange={(event: any) => this.onSearchKeyUp(event.target.value)}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>
                            <span role="img" aria-label="search icon">
                                <FaSearch />
                            </span>
                        </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <div className="d-flex flex-row align-items-center mt-2 overflow-auto">
                    <label className="text-muted m-0" style={{ whiteSpace: 'nowrap' }}>
                        recent searches:
                    </label>
                    {this.state.recentSearches.length > 0
                        ? this.state.recentSearches.map((search, index) =>
                            <span key={index} className="recent-search-pill ml-2">
                                <span>
                                    {search}
                                </span>
                                <span onClick={e => this.removeSearch(index)} role="button" className="ml-2 cursor-pointer">
                                    <FaTimesCircle />
                                </span>
                            </span>
                        ) : ''
                    }
                </div>
            </div>
        );
    }
}
