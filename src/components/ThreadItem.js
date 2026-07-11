import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postedAt } from '../utils';
import {
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
  asyncToggleNeutralizeVoteThread,
} from '../states/threads/action';

function ThreadItem({ id, title, body, category, createdAt, totalComments, user, upVotesBy, downVotesBy }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((states) => states.authUser);

  const isUpvoted = authUser && upVotesBy.includes(authUser.id);
  const isDownvoted = authUser && downVotesBy.includes(authUser.id);

  function onThreadClick() {
    navigate(`/threads/${id}`);
  }

  function onUpvoteClick(event) {
    event.stopPropagation();
    if (isUpvoted) {
      dispatch(asyncToggleNeutralizeVoteThread(id));
    } else {
      dispatch(asyncToggleUpvoteThread(id));
    }
  }

  function onDownvoteClick(event) {
    event.stopPropagation();
    if (isDownvoted) {
      dispatch(asyncToggleNeutralizeVoteThread(id));
    } else {
      dispatch(asyncToggleDownvoteThread(id));
    }
  }

  return (
    <div className="thread-item" onClick={onThreadClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onThreadClick(); }}>
      <div className="thread-item__user-info">
        <img src={user.avatar} alt={user.name} />
        <p>{user.name}</p>
      </div>
      <div className="thread-item__content">
        <p className="thread-item__category">#{category}</p>
        <h3 className="thread-item__title">{title}</h3>
        <div className="thread-item__body" dangerouslySetInnerHTML={{ __html: body }} />
      </div>
      <div className="thread-item__footer">
        <button type="button" onClick={onUpvoteClick}>
          {isUpvoted ? '👍' : '🤍'} {upVotesBy.length}
        </button>
        <button type="button" onClick={onDownvoteClick}>
          {isDownvoted ? '👎' : '🖤'} {downVotesBy.length}
        </button>
        <p>{postedAt(createdAt)}</p>
        <p>{totalComments} komentar</p>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
};

export { threadItemShape };
export default ThreadItem;