import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ScrollToTop({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location, navigate]);

    return <>{children}</>;
}

export default ScrollToTop;

////////////////////////////////////////////////////////////////////////////////

/* 
  !!! This Code Only Works with React Router v5 and it isn't supported by React Router v6 or above
  but with installing one of react router v5 you can use this code. !!!
import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
function ScrollToTop({ history, children }) {
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        }
    }, []);
    return <Fragment>{children}</Fragment>;
}
export default withRouter(ScrollToTop);
export default withRouter(ScrollToTop); */