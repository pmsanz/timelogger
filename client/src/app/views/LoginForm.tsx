import React, { FC, SyntheticEvent, useState } from "react";

type LoginViewState = {
  username: string;
  password: string;
};

const LoginForm: FC = () => {
  const [{ username, password }, setLoginState] = useState<LoginViewState>({
    username: "",
    password: "",
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;
    console.log({ username, password });
    setLoginState({ username, password });
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center">
      <h1 className="text-2xl font-medium my-10">Welcome back!</h1>
      <div className="paper">
        <form
          className="flex flex-col w-80 m-12 space-y-8"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="input-group">
            <label className="label">User</label>
            <input
              type="text"
              name="username"
              defaultValue={username}
              className="input-field form-input"
              autoComplete={"on"}
            />
          </div>
          <div className="input-group">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input-field form-input"
              defaultValue={password}
              autoComplete={"on"}
            />
          </div>
          <button className="btn-primary" type="submit">
            Login
          </button>

          <a
            href="#"
            className="font-medium text-sm text-blue-700 hover:text-blue-500"
          >
            Forgot password?
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
