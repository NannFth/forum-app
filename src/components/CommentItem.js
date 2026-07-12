import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../utils';

function CommentItem({ content, createdAt, owner }) {
  return (
    <div className="comment-item">
      <div className="comment-item__user-info">
        <img src={owner.avatar} alt={owner.name} />
        <p>{owner.name}</p>
      </div>
      <p className="comment-item__date">{postedAt(createdAt)}</p>
      <div className="comment-item__content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
};

CommentItem.propTypes = {
  ...commentItemShape,
};

export { commentItemShape };
export default CommentItem;