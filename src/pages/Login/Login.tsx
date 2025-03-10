import { FC, useEffect, useState } from "react";
import { Button } from "../../components/ui/Button/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { login } from "../../redux/auth/authSlice";
import { router } from "../../router/routes";

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      router.navigate("/"); // Redirect to home when already logged in
    }
  }, [isLoggedIn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_GYSYNERGY_USERNAME);
    const predefinedUsername = import.meta.env.VITE_GYSYNERGY_USERNAME;
    const predefinedPassword = import.meta.env.VITE_GYSYNERGY_PASSWORD;

    if (username === predefinedUsername && password === predefinedPassword) {
      dispatch(login(username));
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className={"w-[150px] absolute top-5"}>
        <img src={"/assets/images/gsynergy-logo.svg"} alt={"GSynergy Logo"} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-4/5 lg:w-3/5 xl:w-2/5 2xl:w-1/5 pb-6 border border-gray-300 rounded-lg"
      >
        <div className="border-b-1 border-gray-300 p-4 text-center">
          <h2 className="text-2xl">Login</h2>
        </div>
        <div className="m-6">
          <label htmlFor="username-input" className="block mb-2">
            Username
          </label>
          <input
            id={"username-input"}
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="m-6">
          <label htmlFor={"password-input"} className="block mb-2">
            Password
          </label>
          <input
            id={"password-input"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="w-full flex justify-center">
          <Button text="Login" onClickHandle={() => {}} />
        </div>
      </form>
    </div>
  );
};

export default Login;
