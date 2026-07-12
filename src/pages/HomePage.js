import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ThreadList from '../components/ThreadList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';

function HomePage() {
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = new Set(threads.map((thread) => thread.category));

  const threadList = threads
    .map((thread) => ({
      ...thread,
      user: users.find((user) => user.id === thread.ownerId) || {
        id: '',
        name: 'Unknown',
        avatar: '',
      },
    }))
    .filter((thread) => (filter ? thread.category === filter : true));

  return (
    <section className="home-page">
      <header>
        <h2>Daftar Diskusi</h2>
        <Link to="/new">Buat Thread Baru</Link>
      </header>

      <div className="categories-list">
        <p>Kategori populer:</p>
        {Array.from(categories).map((category) => (
          <button
            key={category}
            type="button"
            className={filter === category ? 'active' : ''}
            onClick={() => setFilter(filter === category ? '' : category)}
          >
            #{category}
          </button>
        ))}
      </div>

      <ThreadList threads={threadList} />
    </section>
  );
}

export default HomePage;