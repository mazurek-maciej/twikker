import { Post, State } from '../models';

const RANDOM_NAMES = [
  'John',
  'Mike',
  'Clara',
  'Anthony',
  'Christina',
  'Clerence',
  'Darious',
  'Benjamin',
  'Angela',
  'Michael',
];

export const URL_GET_POSTS = 'https://jsonplaceholder.typicode.com/posts';

export const getAllPosts = async (): Promise<State> => {
  const res = await fetch(URL_GET_POSTS);

  if (res.ok) {
    const posts: Post[] = await res.json();
    const mappedPosts = posts.map((post) => ({
      ...post,
      userName: RANDOM_NAMES[post.userId - 1],
    }));
    const state = {
      data: mappedPosts,
      error: undefined,
    };
    return state;
  } else {
    const state = {
      data: undefined,
      error: 'Cannot fetch posts. Please try to refresh the page.',
    };
    return state;
  }
};

export const getPost = async (postId: number | string): Promise<State> => {
  const res = await fetch(`${URL_GET_POSTS}/${postId}`);

  if (res.ok) {
    const post: Post = await res.json();
    post.userName = RANDOM_NAMES[post.userId - 1];
    const state = {
      data: [post],
      error: undefined,
    };
    return state;
  } else {
    const state = {
      data: undefined,
      error: `Cannot fetch post with id: ${postId}. Please try to refresh the page`,
    };
    return state;
  }
};
