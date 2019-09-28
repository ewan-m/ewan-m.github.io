import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './SearchBox.css';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';

function SearchBox(props: {parent: any}) {
    const parent = props.parent;
    const recentSearches = ['science'];
    let timeout: NodeJS.Timeout | null;
    
    const onSearchKeyUp = (value: string) => {
        if (timeout !== void 0 && timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            recentSearches.unshift(value);
            props.parent.getArticlesMatching(value)
        }, 1000);
    }

    return (
        <div className="mb-3">
            <InputGroup>
                <Form.Group className="mb-0 mr-2">
                    <Form.Control as="select">
                        <option value="all" selected={true}>All fields</option>
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
                    aria-label="Search comments"
                    value={parent.search}
                    onChange={(event: any) => onSearchKeyUp(event.target.value)}
                />
                <InputGroup.Append>
                    <InputGroup.Text id="basic-addon1">
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
                {recentSearches
                    ? recentSearches.map(search =>
                        <span className="recent-search-pill ml-2">
                            <span>
                                {search}
                            </span>
                            <span role="button" className="ml-2 cursor-pointer">
                                <FaTimesCircle />
                            </span>
                        </span>
                    ) : ''
                }
            </div>
        </div>
    );
}

export default SearchBox;
