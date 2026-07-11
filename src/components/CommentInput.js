import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function CommentInput({ addComment }) {
  const [content, onContentChange, setContent] = useInput('');

  function onSubmitHandler(event) {
    event.preventDefault();
    addComment(content);
    setContent('');
  }

  return (
    <form className="comment-input" onSubmit={onSubmitHandler}>
      <textarea value={content} onChange={onContentChange} placeholder="Tulis komentar..." />
      <button type="submit">Kirim</button>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;