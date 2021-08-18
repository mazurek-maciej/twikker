import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import fetchMock from 'fetch-mock';
import { act, render } from '@testing-library/react';
import { getPost, URL_GET_POSTS } from '../../services/postsService';
import PostDetails from './';
import { Post } from '../../models';

// Need improvements
// describe('Post Details component', () => {
//   let useEffect: any;
//   const mockUseEffect = () => {
//     useEffect.mockImplementationOnce((f: any) => f());
//   };

//   const history = createMemoryHistory();
//   history.push('/post/1');

//   const mockedPost: Post = {
//     body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
//     id: 1,
//     title:
//       'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
//     userId: 1,
//     userName: 'John',
//   };

//   beforeEach(() => {
//     useEffect = jest.spyOn(React, 'useEffect');
//     mockUseEffect();
//   });

//   it('should render details of post', async () => {
//     const postId = 1;
//     fetchMock.get(`${URL_GET_POSTS}/${postId}`, mockedPost);
//     await getPost(postId);

//     act(() => {
//       render(
//         <Router history={history}>
//           <PostDetails />
//         </Router>
//       );
//     });
//   });
// });
