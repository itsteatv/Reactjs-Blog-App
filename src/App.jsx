import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import SinglePost from "./components/SinglePost/SinglePost";
import Posts from "./components/AllPosts/Posts";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Error from "./components/Error/Error";
import Login from "./components/UI/Login";
import Register from './components/UI/Register';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    setIsRegistered(true);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop>
        <Routes>
          <Route path="/" element={isRegistered ? <Navigate to="/Home" /> : <Register onRegister={handleRegister} />} />
          <Route path="/Home" element={
            <>
              <Header />
              <Posts />
            </>
          } />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
