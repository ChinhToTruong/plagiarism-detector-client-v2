import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
  // variables
  const [isSigning, setIsSigning] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // function

  const onLogin = (data) => {
    console.log(data);
    setIsSigning(false);
    toast.success("Login successful");
    setTimeout(() => {
      setIsSigning(true);
      console.log("loging in...");
      navigate("/user");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-lg font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(onLogin)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-blue-700"
              placeholder="username"
              {...register("username", {
                required: true,
                minLength: 5,
                maxLength: 10,
              })}
            />
            {errors.username?.type === "required" && (
              <span className="text-red-500">Ban chua nhap ten dang nhap</span>
            )}
            {errors.username?.type === "minLength" && (
              <span className="text-red-500">Min length 5</span>
            )}
            {errors.username?.type === "maxLength" && (
              <span className="text-red-500">Max length 10</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-blue-700"
              placeholder="password"
              {...register("password", {
                required: true,
                minLength: 5,
                maxLength: 10,
                pattern:
                  /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-z\d!@#$%^&*(),.?":{}|<>]*$/,
              })}
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500">Ban chua nhap ten dang nhap</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500">Min length 5</span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-500">Max length 10</span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500">
                password phai gom chu cai, chu so va ki tu dac biet{" "}
              </span>
            )}
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-400"
              disabled={!isSigning}
            >
              Login
            </button>
          </div>
          <div className="flex justify-center items-center">
            <Link to={"/forgot-password"} className="text-blue-700 text-center">
              forget password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
