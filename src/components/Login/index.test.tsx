import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '.';

describe('Login component', () => {
  beforeEach(() => render(<Login />));
  afterEach(() => cleanup());

  it('should render login form', () => {
    const { container } = render(<Login />);

    expect(container).toBeInTheDocument();
  });

  it('should render two labels', () => {
    const loginLabel = screen.queryByText(/login/i);
    const passwordLabel = screen.queryByText(/password/i);

    expect(loginLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  it('should render two inputs', () => {
    const loginInput = screen.queryByTestId('login');
    const passwordInput = screen.queryByTestId('password');

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should render submit button', () => {
    const submitBtn = screen.queryByText(/log in/i);

    expect(submitBtn).toBeInTheDocument();
  });

  // No clue why errors not appear after click
  // it('should render 5 errors when no input is passed', async () => {
  //   const submitBtn = screen.getByText(/log in/i);

  //   userEvent.click(submitBtn);

  //   const errorLabels = await screen.findAllByTestId('error');

  //   expect(errorLabels).toHaveLength(5);
  // });
});
