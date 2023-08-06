import styles from './Pagination.module.css';
import { Pagination as MuiPagination } from "@mui/material";

function Pagination({ meta, fetchPostData }) {
    const prev = meta.links && meta.links[0] ? meta.links[0].url : null;
    const next = meta.links && meta.links.length > 1 ? meta.links[meta.links.length - 1].url : null;
    const current = meta.current_page || 1;
    const lastPage = meta.last_page || 1;

    return (
        <div className={styles.pagination}>
            <MuiPagination
                count={lastPage}
                page={current}
                showFirstButton
                showLastButton
                variant="outlined"
                shape="rounded"
                onChange={(event, page) => fetchPostData(page)}
            />
        </div>
    );
}

export default Pagination;
