import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useFirebase } from '../../firebase';
import { ContextType } from '../../firebase/types';

export default function Login() {
  const { firebaseAuth, firebase, loadingUser, setLoadingUser } = useFirebase();

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
      const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log('result: ', result);
    } catch ({ code, message, name }) {
      console.error('error code ', code);
      console.error('error message ', message);
      console.error('error name ', name);
    }
  };

  return (
    <div className="wrapper">
      <div className="card">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="title">LOGIN</div>
          <label>
            <div className="label mt-6">email</div>
            <input
              type="email"
              name="email"
              autoComplete="on"
              className="input rounded-sm pl-2 pt-3 pb-3"
              placeholder="Type your email"
              onChange={onEmailChanged}
              value={email}
            />
          </label>

          <label>
            <div className="label mt-4">password</div>
            <input
              autoComplete="on"
              name="password"
              className="input rounded-sm pl-2 pt-3 pb-3"
              type="password"
              placeholder="Type your password"
              onChange={onPasswordChanged}
              value={password}
            />
          </label>

          <button
            type="submit"
            className="mt-2 w-1/2  text-center text-md bg-green-500 p-1 rounded-sm text-white"
          >
            {loadingUser ? <>Loading...</> : <>Login</>}
          </button>
          <div className="label mt-2 text-center">or</div>
          <button className="mt-2 w-1/2  bg-red-500 text-white p-1 rounded-sm">
            Continue with Google
          </button>
          <div className="label mt-4 text-center text-gray-500">don't you have an account?</div>
          <button className="mt-1 w-1/2  text-center text-md bg-yellow-500 text-white font-semibold p-1 rounded-sm">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
