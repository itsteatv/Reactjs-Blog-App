import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import SinglePost from "./components/SinglePost/SinglePost";
import Posts from "./components/AllPosts/Posts";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Error from "./components/Error/Error";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Posts />
            </>
          } />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;

////////////////////////////////////////////////////////////////////////////////

/* 
  !!! This Code Only Works with React Router v5 and it isn't supported by React Router v6 or above
  but with installing one of react router v5 you can use this code. !!!

import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import SinglePost from "./components/SinglePost/SinglePost";
import Posts from "./components/AllPosts/Posts";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Error from "./components/Error/Error";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <Header />
            <Posts />
          </Route>
          <Route path="/post/:id" component={SinglePost} />
          <Route component={Error} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App; */