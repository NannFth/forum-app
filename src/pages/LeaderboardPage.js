import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeaderboardItem from '../components/LeaderboardItem';
import { asyncPopulateLeaderboards } from '../states/leaderboards/action';

function LeaderboardPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <section className="leaderboard-page">
      <h2>Klasemen Pengguna Aktif</h2>
      <div className="leaderboard-list">
        <header>
          <p>Pengguna</p>
          <p>Skor</p>
        </header>
        {leaderboards.map((leaderboard) => (
          <LeaderboardItem key={leaderboard.user.id} {...leaderboard} />
        ))}
      </div>
    </section>
  );
}

export default LeaderboardPage;