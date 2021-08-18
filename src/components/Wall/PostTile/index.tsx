import { Post } from '../../../models';

import '../styles.scss';

interface Props {
  post: Post;
  handleOnClick: (id: number) => void;
}

export default function PostTile({ post, handleOnClick }: Props) {
  return (
    <div className='wall-post' onClick={() => handleOnClick(post.id)}>
      <h3 className='wall-post__user'>
        {post.userName} <span className='wall-post__eyes'>👀</span>
      </h3>
      <h4 className='wall-post__title'>{post.title}</h4>
    </div>
  );
}
