import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import SinglePost from "./components/SinglePost/SinglePost";
import Posts from "./components/AllPosts/Posts";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Error from "./components/Error/Error";
import Login from "./components/UI/Login";
import Register from './components/UI/Register';
import Dashboard from "./components/Dashboard/Dashboard";
import UpdateProfile from "./components/Dashboard/UpdateProfile"
import { useSelector } from 'react-redux';

function App() {
  const isRegistered = useSelector((state) => state.register.isRegistered);
  const isLoggedIn = useSelector((state) => state.register.isLoggedIn);

  return (
    <>
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
          <Route
            path="/register"
            element={
              isRegistered || isLoggedIn ? <Dashboard /> : <Register />
            }
          />
          <Route
            path="/login"
            element={
              isRegistered || isLoggedIn ? <Dashboard /> : <Login />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setting" element={<UpdateProfile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}

export default App;