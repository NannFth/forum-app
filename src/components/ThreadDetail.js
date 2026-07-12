import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { postedAt } from '../utils';
import {
  asyncToggleUpvoteThreadDetail,
  asyncToggleDownvoteThreadDetail,
  asyncToggleNeutralizeVoteThreadDetail,
} from '../states/threadDetail/action';

function ThreadDetail({ title, body, category, createdAt, owner, upVotesBy, downVotesBy }) {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);

  const isUpvoted = authUser && upVotesBy.includes(authUser.id);
  const isDownvoted = authUser && downVotesBy.includes(authUser.id);

  function onUpvoteClick() {
    if (isUpvoted) {
      dispatch(asyncToggleNeutralizeVoteThreadDetail());
    } else {
      dispatch(asyncToggleUpvoteThreadDetail());
    }
  }

  function onDownvoteClick() {
    if (isDownvoted) {
      dispatch(asyncToggleNeutralizeVoteThreadDetail());
    } else {
      dispatch(asyncToggleDownvoteThreadDetail());
    }
  }

  return (
    <div className="thread-detail">
      <header className="thread-detail__header">
        <p className="thread-detail__category">#{category}</p>
        <h2 className="thread-detail__title">{title}</h2>
        <div className="thread-detail__owner-info">
          <img src={owner.avatar} alt={owner.name} />
          <p>Dibuat oleh {owner.name} • {postedAt(createdAt)}</p>
        </div>
      </header>
      <div className="thread-detail__body" dangerouslySetInnerHTML={{ __html: body }} />
      <footer className="thread-detail__footer">
        <button type="button" onClick={onUpvoteClick}>
          {isUpvoted ? '👍' : '🤍'} {upVotesBy.length}
        </button>
        <button type="button" onClick={onDownvoteClick}>
          {isDownvoted ? '👎' : '🖤'} {downVotesBy.length}
        </button>
      </footer>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ThreadDetail;