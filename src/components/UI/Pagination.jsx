import { Pagination as MuiPagination, Skeleton } from "@mui/material";
import "./Pagination.css"

function Pagination({ meta, fetchPostData, isLoading }) {
    const prev = meta.links && meta.links[0] ? meta.links[0].url : null;
    const next = meta.links && meta.links.length > 1 ? meta.links[meta.links.length - 1].url : null;
    const current = meta.current_page || 1;
    const lastPage = meta.last_page || 1;

    if (isLoading) {
        return (
            <div className="pagination">
                <Skeleton variant="rounded" />
            </div>
        );
    }

    return (
        <div className="pagination">
            <MuiPagination
                count={lastPage}
                page={current}
                showFirstButton
                showLastButton
                variant="text"
                shape="circular"
                className="MuiPagination-ul MuiPagination-root"
                onChange={(event, page) => fetchPostData(page)}
            />
        </div>
    );
}

export default Pagination;
