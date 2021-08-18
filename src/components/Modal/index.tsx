import './styles.scss';

interface Props {
  message?: string;
  isVisible: boolean;
  toggleVisibility: () => void;
}

export default function Modal({
  message = '👀',
  isVisible,
  toggleVisibility,
}: Props) {
  if (isVisible) {
    return (
      <div className={`modal ${isVisible ? 'is-active' : ''}`}>
        <div className='modal-box'>
          <h3>{message}</h3>
          <button className='modal-btn' onClick={toggleVisibility}>
            OK
          </button>
        </div>
      </div>
    );
  }
  return null;
}
