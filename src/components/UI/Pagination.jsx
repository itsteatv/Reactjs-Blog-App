import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={styles.pagination}>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`${styles['page-item']} ${currentPage === number ? styles['active'] : ''
                            }`}
                    >
                        <a
                            onClick={() => paginate(number)}
                            className={`${styles['page-link']} ${currentPage === number ? styles['active'] : ''
                                }`}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
