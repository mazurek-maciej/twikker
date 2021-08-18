import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { getAllPosts } from '../../services/postsService';
import { useFetchData } from '../../hooks/useFetchData';
import { useAuth } from '../../context/AuthContext';

import PostTile from './PostTile';

import { Post, StatusOfApiCall } from '../../models';

import './styles.scss';
import Modal from '../Modal';

export default function Wall() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [counter, setCounter] = useState(0);

  const { status, state } = useFetchData(() => getAllPosts());
  const rawPosts = state?.data;

  const { logout } = useAuth();

  const { push: redirectTo } = useHistory();

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    if (searchTerm.length === 0) {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
    const filtered = posts.filter(
      (p) => p.title.match(searchTerm) || p.body.match(searchTerm),
    );
    setFilteredPosts(filtered);
  };

  const handleOnSelectPost = useCallback(
    (id: number) => redirectTo(`/post/${id}`),
    [redirectTo],
  );

  const toggleModalVisibility = () => setIsModalVisible(false);

  const renderStatus = useCallback(() => {
    if (status === StatusOfApiCall.FETCHING) return <p>Loading...</p>;

    if (status === StatusOfApiCall.FAILURE)
      return (
        <Modal
          message={state?.error}
          isVisible={isModalVisible}
          toggleVisibility={toggleModalVisibility}
        />
      );
  }, [status, state?.error, isModalVisible]);

  const renderPosts = useCallback(() => {
    if (
      isSearching &&
      filteredPosts.length > 0 &&
      status === StatusOfApiCall.SUCCESS
    ) {
      return filteredPosts.map((post) => (
        <PostTile key={post.id} post={post} handleOnClick={handleOnSelectPost} />
      ));
    }
    if (!isSearching && posts && status === StatusOfApiCall.SUCCESS) {
      return posts.map((post) => (
        <PostTile key={post.id} post={post} handleOnClick={handleOnSelectPost} />
      ));
    }
    return null;
  }, [filteredPosts, handleOnSelectPost, isSearching, posts, status]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (rawPosts && posts.length !== rawPosts?.length) {
      interval = setInterval(() => {
        setPosts([...posts, rawPosts[counter]]);
        setCounter(counter + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [counter, state, posts, rawPosts]);

  console.log(state);

  return (
    <div className='wall'>
      <div className='wall-header'>
        <button className='wall-header__btn' onClick={logout}>
          logout
        </button>
        <div className='wall-header__search'>
          <label htmlFor='search' className='wall-header__search-label'>
            Search
          </label>
          <input
            className='wall-header__search-input'
            id='search'
            type='text'
            onChange={handleOnSearch}
          />
        </div>
      </div>
      <div className='wall-posts'>
        {renderPosts()}
        {renderStatus()}
      </div>
    </div>
  );
}
