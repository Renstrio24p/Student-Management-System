import { FormEvent } from "react";
import { NavLink } from "react-router-dom";
import { SetStates } from "../types/SetStates";

type Props = {
  handleLogin: (e: FormEvent<HTMLFormElement>) => void;
  setter: SetStates;
  error: string | null;
};

export default function Login({ handleLogin, setter, error }: Props) {
  return (
    <div className="bg-gray-500 md:max-w-md xl:max-w-xl w-full h-fit rounded-md relative flex flex-col justify-center items-center z-10 shadow-lg px-7">
      <img
        className="w-20 h-20 bg-gray-300 rounded-b-full absolute -top-10"
        src="/bg1.png"
        alt="logo"
      />
      <h1 className="mt-12 text-white text-lg font-semibold">Login</h1>
      {error && (
        <p className="text-red-500 w-full p-2 border border-red-400 bg-red-200 rounded-md">
          {error}
        </p>
      )}
      <form className="pt-7 pb-2" onSubmit={handleLogin}>
        <label htmlFor="email" className="text-white">
          Email Address
        </label>
        <input
          className="w-full h-10 my-2 rounded-md bg-gray-200 p-2"
          type="email"
          name="email"
          id="email"
          value={setter.email}
          onChange={e => setter.setEmail(e.target.value)}
        />
        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input
          className="w-full h-10 my-2 rounded-md bg-gray-200 p-2"
          type="password"
          name="password"
          id="password"
          value={setter.password}
          onChange={e => setter.setPassword(e.target.value)}
        />
        <p className="text-white">
          {setter.isLogin ? "Login as :" : "Register as :"}
        </p>
        <div className="flex gap-4 my-2">
          {["Student", "Teacher", "Admin"].map(roleOption => (
            <button
              key={roleOption}
              type="button"
              className={`btn ${
                setter.role === roleOption
                  ? "bg-orange-300 text-black"
                  : "bg-slate-400"
              } text-white px-4 py-2 rounded-md`}
              onClick={() => setter.setRole(roleOption)}>
              {roleOption}
            </button>
          ))}
        </div>
        <button
          className="w-full h-10 my-2 rounded-md bg-orange-300 text-black"
          type="submit">
          Login
        </button>
      </form>
      <p className="text-white py-2">
        Don't have an account?
        <NavLink
          to={"/choice-user"}
          className="text-blue-500"
          onClick={() => setter.setIsLogin(false)}>
          {" "}
          Register
        </NavLink>
      </p>
    </div>
  );
}
