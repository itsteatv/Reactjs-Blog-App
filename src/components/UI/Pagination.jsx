import { Link } from 'react-router-dom';
import styles from './Pagination.module.css';

function Pagination({ meta, fetchPostData }) {
    const prev = meta.links && meta.links[0] ? meta.links[0].url : null;
    const next = meta.links && meta.links.length > 1 ? meta.links[meta.links.length - 1].url : null;
    const current = meta.current_page || 1;
    const lastPage = meta.last_page || 1;

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= lastPage; i++) {
            pageNumbers.push(
                <Link
                    key={i}
                    className={`${styles["page-link"]} ${current === i ? styles["active"] : ""}`}
                    to="#"
                    onClick={() => fetchPostData(i)}
                >
                    {i}
                </Link>
            );
        }

        return pageNumbers;
    };

    return (
        <div className={styles.pagination}>
            {prev && (
                <Link className={styles["page-link"]} to="#" onClick={() => fetchPostData(current - 1)}>
                    prev
                </Link>
            )}
            {renderPageNumbers()}
            {next && (
                <Link className={styles["page-link"]} to="#" onClick={() => fetchPostData(current + 1)}>
                    next
                </Link>
            )}
        </div>
    );
}

export default Pagination;
