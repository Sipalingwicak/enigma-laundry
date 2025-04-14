import React from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { toast } from "sonner";
import { Icon } from "@iconify/react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      const token = response.data.data.token;

      if (token) {
        // Simpan token ke localStorage
        localStorage.setItem("token", token);
        toast.success("Login Success. Welcome to Enigma Laundry :)");
        // console.log("Login berhasil, token tersimpan di localStorage :", token);

        // Redirect ke dashboard setelah login berhasil
        navigate("/dashboard");
      } else {
        setError("Token did not found in response.", error);
        console.error("Token did not found in response.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      // toast.error("Login fail. Please try again.");
      toast.error("Login fail. Please try again.");
    }
  };

  return (
    <>
      <Background />

      <div className="relative z-10 w-full min-h-screen">
        <Header />

        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg bg-white bg-opacity-90  p-8 rounded-lg shadow-lg">
            <h1 className="text-center text-2xl font-bold text-emerald-600 sm:text-3xl">
              Get started today
            </h1>

            <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
              Please input your username and password to login
            </p>

            <form onSubmit={handleSubmit} className="mt-6 mb-0 space-y-4">
              <p className="text-center text-lg font-medium text-emerald-600">
                Sign in to your account
              </p>

              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-xs"
                    placeholder="Enter Username"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative mb-5">
                  <input
                    endcontent={
                      <button type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                          <Icon
                            className="pointer-events-none text-2xl text-default-400"
                            icon="solar:eye-closed-linear"
                          />
                        ) : (
                          <Icon
                            className="pointer-events-none text-2xl text-default-400"
                            icon="solar:eye-bold"
                          />
                        )}
                      </button>
                    }
                    id="password"
                    type={isVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border-gray-200 p-4 text-sm
                  shadow-xs"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="block w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 px-5 py-3 text-sm font-medium text-white"
              >
                Sign in
              </button>

              <p className="text-center text-sm text-gray-500">
                Didn't have an account?{" "}
                <a
                  className="hover:underline hover:text-emerald-600 text-emerald-500"
                  href="/register"
                >
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
