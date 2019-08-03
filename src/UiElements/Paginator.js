import React from 'react';
import './MenuItem.css';
import Pagination from 'react-bootstrap/Pagination'

function Paginator(props) {

    return (
        <Pagination>
            <Pagination.Prev>
                Previous
            </Pagination.Prev>
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next>
                Next
            </Pagination.Next>
        </Pagination>
    );
}

export default Paginator;

