import { getPost, getAllPosts, URL_GET_POSTS } from './postsService';
import fetchMock from 'fetch-mock';
import { Post, State } from '../models';

describe('Posts services', () => {
  const mockedPosts: Post[] = [
    {
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      userId: 1,
      userName: 'John',
    },
    {
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      id: 2,
      title: 'sunt aut facere',
      userId: 1,
      userName: 'John',
    },
  ];

  const mockedPost: Post = {
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    userId: 1,
    userName: 'John',
  };

  beforeEach(() => {
    fetchMock.reset();
  });

  describe('in happy path', () => {
    it('should return success state with posts and no error for getAllPosts', async () => {
      const mockedState: State = {
        data: mockedPosts,
        error: undefined,
      };
      fetchMock.get(URL_GET_POSTS, mockedPosts);

      const res = await getAllPosts();
      expect(res).toEqual(mockedState);
    });

    it('should return success state with one post and no error for getPost', async () => {
      const postId = 1;
      const mockedState: State = {
        data: [mockedPost],
        error: undefined,
      };
      fetchMock.get(`${URL_GET_POSTS}/${postId}`, mockedPost);

      const res = await getPost(postId);
      expect(res).toEqual(mockedState);
      expect(res.data).toHaveLength(1);
    });
  });

  describe('in unhappy path', () => {
    it('should return failure state without posts for getAllPosts', async () => {
      const mockedState: State = {
        data: undefined,
        error: 'Cannot fetch posts. Please try to refresh the page.',
      };
      fetchMock.get(URL_GET_POSTS, {
        body: {},
        status: 400,
      });

      const res = await getAllPosts();
      expect(res).toEqual(mockedState);
    });

    it('should return failure state without post for getPost', async () => {
      const postId = 1;
      const mockedState: State = {
        data: undefined,
        error: `Cannot fetch post with id: ${postId}. Please try to refresh the page`,
      };
      fetchMock.get(`${URL_GET_POSTS}/${postId}`, {
        body: {},
        status: 400,
      });

      const res = await getPost(postId);
      expect(res).toEqual(mockedState);
    });
  });
});
