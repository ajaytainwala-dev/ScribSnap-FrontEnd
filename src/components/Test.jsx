import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Submit form data (optional)
  };

  const handleError = (error) => {
    toast.error(error.message, {
      position: 'top-right',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            {...register('firstName', {
              required: true,
              minLength: { value: 2, message: 'First name must be at least 2 characters' },
              validate: (value) => (value.trim() !== '' || handleError('Please enter your first name')),
            })}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            {...register('lastName', {
              required: true,
              minLength: { value: 2, message: 'Last name must be at least 2 characters' },
              validate: (value) => (value.trim() !== '' || handleError('Please enter your last name')),
            })}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            {...register('username', {
              required: true,
              minLength: { value: 5, message: 'Username must be at least 5 characters' },
              validate: (value) => (value.trim() !== '' || handleError('Please enter your username')),
            })}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            {...register('email', {
              required: true, // Shorthand for required message
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email format',
              },
              validate: (value) => (value.trim() !== '' || handleError('Email is required')) || (/\S+@\S+\.\S+/.test(value) || handleError('Invalid email format')),
            })}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            {...register('password', {
              required: true, // Shorthand for required message
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
              validate: (value) => (value.trim() !== '' || handleError('Password is required')),
            })}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUpForm;
