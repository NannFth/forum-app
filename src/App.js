import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddThreadPage from './pages/AddThreadPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

function App() {
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  function onSignOut() {
    dispatch(asyncUnsetAuthUser());
  }

  if (isPreload) {
    return null;
  }

  return (
    <>
      <LoadingBar />
      <div className="app-container">
        <header>
          <h1>
            <Link to="/">Aplikasi Forum Diskusi</Link>
          </h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/leaderboards">Leaderboard</Link>
            {authUser ? (
              <button type="button" onClick={onSignOut}>
                Keluar
              </button>
            ) : (
              <Link to="/login">Masuk</Link>
            )}
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/new" element={authUser ? <AddThreadPage /> : <LoginPage />} />
            <Route path="/leaderboards" element={<LeaderboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;