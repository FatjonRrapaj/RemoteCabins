import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { useFirebase } from '../../firebase';
import { handleAuthErrorCode } from '../../firebase/errorMessageHandler';

export default function Login() {
  const navigate = useNavigate();
  const { firebaseAuth, loadingUser, setUser, setLoadingUser } = useFirebase();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onEmailChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const onPasswordChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingUser(true);
    try {
      const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      setUser(result.user);
      console.log('result: ', result);
      navigate('/', { replace: true });
      setLoadingUser(false);
    } catch (error: any) {
      setLoadingUser(false);
      handleAuthErrorCode(error.code);
    }
  };

  //TODO: set input & button as separate reusable compoents
  return (
    <div className="wrapper">
      <div className="card">
        <form className="flex w-full flex-col items-center" onSubmit={handleSubmit}>
          <div className="title text-green-900 mb-4">🌳 Remote Cabins</div>
          <div className="title">SIGNUP</div>
          <label className="w-full mt-6">
            <div className="label ">email</div>
            <input
              type="email"
              name="email"
              autoComplete="on"
              className="input"
              placeholder="Type your email"
              onChange={onEmailChanged}
              value={email}
            />
          </label>

          <label className="w-full mt-4">
            <div className="label">password</div>
            <input
              autoComplete="on"
              name="password"
              className="input"
              type="password"
              placeholder="Type your password"
              onChange={onPasswordChanged}
              value={password}
            />
          </label>

          <button
            type="submit"
            disabled={!!loadingUser}
            className="mt-2 w-1/2  text-center text-md bg-green-500 p-1 rounded text-white"
          >
            {loadingUser ? 'Loading...' : 'Sign up'}
          </button>
          <div className="label mt-2 text-center">or</div>
          <button className="mt-2 w-1/2  bg-red-500 text-white p-1 rounded">
            Continue with Google
          </button>
          <div className="label mt-4 text-center text-gray-500">do you have an account?</div>
        </form>
        <Link
          className="mt-1 w-1/2 self-center text-center text-md  text-green-500 font-semibold p-1 rounded"
          to="/login"
          replace
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
