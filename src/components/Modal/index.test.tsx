import { render, screen } from '@testing-library/react';
import Modal from '.';

describe('Modal component', () => {
  const message = 'My modal message';
  const toggleVisibility = jest.fn();

  it('should render component with default message', () => {
    render(<Modal isVisible={true} toggleVisibility={toggleVisibility} />);

    const defaultMessage = screen.queryByText('👀');

    expect(defaultMessage).toBeInTheDocument();
  });

  it('should render component with passed message', () => {
    render(
      <Modal
        message={message}
        isVisible={true}
        toggleVisibility={toggleVisibility}
      />,
    );

    const msg = screen.queryByText(message);

    expect(msg).toBeInTheDocument();
  });

  it('should not render component when isVisible is false', () => {
    render(
      <Modal
        message={message}
        isVisible={false}
        toggleVisibility={toggleVisibility}
      />,
    );

    const msg = screen.queryByText(message);

    expect(msg).toBeNull();
  });
});
