/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import Sidebar from './../../components/Sidebar/Sidebar';
import { useParams } from 'react-router-dom';

const mainContanier = css`
    padding: 10px;
`;

const BookDetail = () => {
    const { bookId } = useParams();

    

    return (
        <div css={mainContanier}>
            <Sidebar />
            <div>{bookId}</div>
        </div>
    );
};

export default BookDetail;