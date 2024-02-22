import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import MainPage from './pages/MainPage';
import BookingPage from './pages/BookingPage';
import MyJimventory from './pages/MyJimventory';
import StartPage from './pages/StartPage';
import MyPage from './pages/MyPage';
import Layout from './Layout';

function App() {
  return (
    <Router>
      <div className="inner-container">
        <Routes>
          <Route path="/" element={<StartPage />} />

          <Route
            path="/main"
            element={
              <Layout menu="true">
                <MainPage />
              </Layout>
            }
          />
          <Route
            path="/my-jimventory"
            element={
              <Layout menu="true">
                <MyJimventory />
              </Layout>
            }
          />
          <Route
            path="/my-page"
            element={
              <Layout menu="true">
                <MyPage />
              </Layout>
            }
          />
          <Route
            path="/booking/:id"
            element={
              <Layout>
                <BookingPage />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
