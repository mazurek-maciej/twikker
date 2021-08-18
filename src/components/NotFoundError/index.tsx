import { useHistory } from 'react-router-dom';

import './styles.scss';

export default function NotFoundError() {
  const history = useHistory();
  const handleOnBack = () => history.push('/');

  return (
    <div className='not-found'>
      <h3>You may not find here what you looking for</h3>
      <h2>Go back to main site and enjoy dose of your favourite posts 🔥</h2>
      <button className='not-found-btn' onClick={handleOnBack}>
        Back to main site
      </button>
    </div>
  );
}
