// src/components/UserProfile/__tests__/UserProfile.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import UserProfile from '../UserProfile';

// Mock Redux store
const initialState = {
  user: {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  },
};

const reducer = (state = initialState, action) => state;
const store = createStore(reducer);

// Mock axios
jest.mock('axios');

describe('userProfile Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserProfile />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('renders login form by default', () => {
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('handles input changes for login form', () => {
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'password123' },
    });

    expect(screen.getByPlaceholderText(/enter your email/i).value).toBe('test@example.com');
    expect(screen.getByPlaceholderText(/enter your password/i).value).toBe('password123');
  });

  it('submits the login form and calls login API', async () => {
    axios.post.mockResolvedValue({
      data: {
        token: 'fake-token',
        user: {
          email: 'test@example.com',
        },
      },
    });

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText(/login/i));

    await screen.findByText(/login successful: welcome test@example.com/i);

    expect(localStorage.getItem('token')).toBe('fake-token');
  });

  it('toggles to signup form', () => {
    fireEvent.click(screen.getByText(/sign up/i));

    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('handles input changes for signup form', () => {
    fireEvent.click(screen.getByText(/sign up/i));

    fireEvent.change(screen.getByPlaceholderText(/enter your first name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your last name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your username/i), {
      target: { value: 'johndoe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'password123' },
    });

    expect(screen.getByPlaceholderText(/enter your first name/i).value).toBe('John');
    expect(screen.getByPlaceholderText(/enter your last name/i).value).toBe('Doe');
    expect(screen.getByPlaceholderText(/enter your username/i).value).toBe('johndoe');
    expect(screen.getByPlaceholderText(/enter your email/i).value).toBe('johndoe@example.com');
    expect(screen.getByPlaceholderText(/enter your password/i).value).toBe('password123');
  });

  it('submits the signup form and calls signup API', async () => {
    axios.post.mockResolvedValue({});

    fireEvent.click(screen.getByText(/sign up/i));

    fireEvent.change(screen.getByPlaceholderText(/enter your first name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your last name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your username/i), {
      target: { value: 'johndoe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText(/sign up/i));

    await screen.findByText(/signup successful: please login/i);

    expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/api/users/signup', {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: 'password123',
    });
  });
});
