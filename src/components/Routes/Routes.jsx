import Header from "../Header/Header";
import SinglePost from "../SinglePost/SinglePost";
import Posts from "../AllPosts/Posts";
import Error from "../Error/Error";

const routes = [
    {
        path: '/',
        element: (
            <>
                <Header />
                <Posts />
            </>
        ),
    },
    {
        path: '/post/:id',
        element: <SinglePost />,
    },
    {
        path: '*',
        element: <Error />,
    },
];

export default routes;
