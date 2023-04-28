/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const tableContainer = css`
    height: 300px;
    overflow: auto;
`;

const table = css`
    border: 1px solid #dbdbdb;
    font-size: 12px;
`;

const thAndTd = css`
    border: 1px solid #dbdbdb;
    padding: 5px 10px;
    text-align: center;
`;


const BookRegister = () => {
    const queryClient = useQueryClient();

    const [ searchParams, setSearchParams ] = useState({page: 1, searchValue: ""});

    const getBooks = useQuery(["registerBookSearch"], async () => {
        const option = {
            params: {
                ...searchParams
            },
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        console.log(option)
        return await axios.get("http://localhost:8080/books", option);
    });
    const registeBookList = useMutation();

    const searchInputHandle = (e) => {
        setSearchParams({...searchParams, searchValue: e.target.value});
    }
    
    const searchSubmitHandle = () => {
        setSearchParams({...searchParams, page: 1});
        queryClient.invalidateQueries("registerBookSearch");
    }

    return (
        <div>
            <Sidebar />
            <div>
                <label>도서검색</label>
                <input type="text" onChange={searchInputHandle}/>
                <button><BiSearch onClick={searchSubmitHandle}/></button>
            </div>
            <div css={tableContainer}>
                <table css={table}>
                    <thead>
                        <tr>
                            <th css={thAndTd}>선택</th>
                            <th css={thAndTd}>분류</th>
                            <th css={thAndTd}>도서명</th>
                            <th css={thAndTd}>저자명</th>
                            <th css={thAndTd}>출판사</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getBooks.isLoading ? "" : getBooks.data.data.bookList.map(book => 
                            <tr key={book.bookId}>
                                <td css={thAndTd}><input type="radio" name='select' value={book.booId} /></td>
                                <td css={thAndTd}>{book.categoryName}</td>
                                <td css={thAndTd}>{book.bookName}</td>
                                <td css={thAndTd}>{book.authorName}</td>
                                <td css={thAndTd}>{book.publisherName}</td>
                            </tr>
                        )}

                    </tbody>
                </table>
                <div>
                    <button>&#60;</button>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button>&#62;</button>
                </div>
            </div>
            <div>
                <label>도서코드</label>
                <input type="text" placeholder='' readOnly/>
            </div>
            <div>
                <label>분류</label>
                <input type="text" readOnly/>
            </div>
            <div>
                <label>도서명</label>
                <input type="text" readOnly/>
            </div>
            <div>
                <label>저자</label>
                <input type="text" readOnly/>
            </div>
            <div>
                <label>출판사</label>
                <input type="text" readOnly/>
            </div>
            <div>
                <label>이미지경로</label>
                <input type="text" readOnly/>
            </div>
        </div>
    );
};

export default BookRegister;