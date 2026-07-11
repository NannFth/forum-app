import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import { asyncReceiveThreadDetail, asyncAddComment } from '../states/threadDetail/action';

function DetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((states) => states.threadDetail);
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  function onAddComment(content) {
    dispatch(asyncAddComment({ threadId: id, content }));
  }

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="detail-page">
      <ThreadDetail {...threadDetail} />
      {authUser && <CommentInput addComment={onAddComment} />}
      <CommentList comments={threadDetail.comments} />
    </section>
  );
}

export default DetailPage;