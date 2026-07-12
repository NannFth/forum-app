import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  function onSubmitHandler(event) {
    event.preventDefault();
    addThread({ title, body, category });
  }

  return (
    <form className="thread-input" onSubmit={onSubmitHandler}>
      <input type="text" value={title} onChange={onTitleChange} placeholder="Judul" />
      <input type="text" value={category} onChange={onCategoryChange} placeholder="Kategori" />
      <textarea value={body} onChange={onBodyChange} placeholder="Tuliskan pemikiranmu di sini..." />
      <button type="submit">Buat Thread</button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;