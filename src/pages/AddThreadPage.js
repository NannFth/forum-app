import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';
import ThreadInput from '../components/ThreadInput';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onAddThread({ title, body, category }) {
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  }

  return (
    <section className="add-thread-page">
      <h2>Buat Diskusi Baru</h2>
      <ThreadInput addThread={onAddThread} />
    </section>
  );
}

export default AddThreadPage;