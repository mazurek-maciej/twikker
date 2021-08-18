import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFetchData } from '../../hooks/useFetchData';
import { StatusOfApiCall } from '../../models';
import { getPost } from '../../services/postsService';
import Modal from '../Modal';

import './styles.scss';

export default function PostDetails() {
  const [visible, setVisible] = useState(true);

  const { pathname } = useLocation();

  const postId = pathname.match(/\/post\/(.*)/)![1];

  const { status, state } = useFetchData(() => getPost(postId));
  const post = state?.data;

  const handleModalVisibility = () => setVisible(false);

  if (status === StatusOfApiCall.FETCHING) {
    return (
      <div className='post-details'>
        <p className='post-details__loading'>
          Loading data for post with ID {postId}
        </p>
      </div>
    );
  }

  if (status === StatusOfApiCall.SUCCESS && post) {
    return (
      <div className='post-details'>
        <div className='post-details__header'>
          <Link className='post-details__header-back' to='/'>
            Go back
          </Link>
          <h1 className='post-details__header-h1'>Details</h1>
        </div>
        <h2 className='post-details__username'>{post[0].userName}</h2>
        <p>ID: {post[0].userId}</p>
        <h3>{post[0].title}</h3>
        <p>{post[0].body}</p>
      </div>
    );
  }
  return (
    <>
      <Modal
        message={state?.error}
        isVisible={visible}
        toggleVisibility={handleModalVisibility}
      />
      <h1>Post ID:{postId} not found</h1>
    </>
  );
}
