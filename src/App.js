import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import MainPage from './pages/MainPage';
import BookingPage from './pages/BookingPage';
import MyJimventory from './pages/MyJimventory';
import StartPage from './pages/StartPage';
import MyPage from './pages/MyPage';
import Layout from './Layout';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="inner-container">
          <Routes>
            <Route path="/" element={<StartPage />} />
            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/join" element={<JoinPage />} /> */}
            {/* <Route
              path="/landing"
              element={
                <Layout>
                  <LandingPage />
                </Layout>
              }
            /> */}
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
    </AuthProvider>
  );
}

export default App;
