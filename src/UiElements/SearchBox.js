import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import './SearchBox.css';
import { FaSearch } from 'react-icons/fa';

function SearchBox(props) {
    const parent = props.parent;


    return (
        <InputGroup>
            <FormControl
                placeholder="Search"
                aria-label="Search comments"
                onChange = {(event) => parent.onSearchKeyUp(event.target.value)}
            />
            <InputGroup.Append>
                <InputGroup.Text id="basic-addon1">
                    <span role="img" aria-label="search icon">
                        <FaSearch />
                    </span>
                </InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
    );
}

export default SearchBox;
