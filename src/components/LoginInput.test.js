import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

/**
 * test scenario for LoginInput component
 *
 * - LoginInput component
 *   - should render the email input, password input, and login button
 *   - should call the login function with the typed email and password when the form is submitted
 *   - should call the login function when the login button is clicked (not only via form submit)
 *   - should keep the typed value visible in the input field
 */
describe('LoginInput component', () => {
  it('should render the email input, password input, and login button', () => {
    render(<LoginInput login={() => {}} />);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should call the login function with the typed email and password when the form is submitted', async () => {
    const mockLogin = jest.fn();
    render(<LoginInput login={mockLogin} />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'adnan@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'rahasia123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'adnan@example.com',
      password: 'rahasia123',
    });
  });

  it('should call the login function when the login button is clicked (not only via form submit)', async () => {
    const mockLogin = jest.fn();
    render(<LoginInput login={mockLogin} />);

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  it('should keep the typed value visible in the input field', async () => {
    render(<LoginInput login={() => {}} />);

    const emailInput = screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'adnan@example.com');

    expect(emailInput).toHaveValue('adnan@example.com');
  });
});
