import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import SinglePost from "./components/SinglePost/SinglePost";
import Posts from "./components/AllPosts/Posts";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop >
        <Switch>
          <Route exact path="/" component={Header} />
        </Switch>
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/post/:id" component={SinglePost} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
