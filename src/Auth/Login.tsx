export default function Login() {
  return (
    <div className="wrapper">
      <div className="card">
        <div className="title">Log in</div>
        <div className="label mt-6">email</div>
        <input className="input" placeholder="domain@example.com" />
        <div className="label mt-4">password</div>
        <input className="input" type="password" />
        <div className="label  self-stretch mt-4 text-center">or</div>
        <button className="mt-5">Log in with google</button>
      </div>
    </div>
  );
}
