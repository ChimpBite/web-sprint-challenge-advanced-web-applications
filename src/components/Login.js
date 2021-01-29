import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Yup validation
const validationSchema = Yup.object({
  username: Yup.string().required('Username or Password not valid'),
  password: Yup.string().required('Username or Password not valid'),
});

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  // setting formik initial values
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      axios
        .post('http://localhost:5000/api/login', {
          username: values.username,
          password: values.password,
        })
        .then(res => {
          console.log('Props', props);
          console.log('Resource', res.data);
          localStorage.setItem('token', res.data.payload);
          props.history.push('/bubblepage');
        })
        .catch(err => {
          console.log('Error', err);
        });
    },
  });

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          className='login-input'
          id='username'
          name='username'
          label='username'
          placeholder='Username'
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
        />
        <input
          className='login-input'
          id='password'
          name='password'
          label='password'
          placeholder='Password'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
        />
        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEST "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
