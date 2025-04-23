import React from "react";
import Background from "../components/layout/Background";
import Header from "../components/layout/Header";
import { RadioGroup, Radio } from "@heroui/react";
import { useState } from "react";
import axiosInstance from "../lib/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  //state handle register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  //state message
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        email,
        username,
        password,
        role,
      };

      const response = await axiosInstance.post("/auth/register", payload);
      // setMessage("Registrasi berhasil!");
      console.log("Registration success", response.data);
      toast.success("Registration success... Directing to login page");

      if (response.data) {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      // console.error("Registrasi gagal:", err);
      setError("Registration failed. Please check your data.");
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            {message && (
              <div className="text-center text-lg font-medium text-emerald-600">
                {message}
              </div>
            )}
            {error && (
              <div className="text-center text-lg font-medium text-red-600">
                {error}
              </div>
            )}
            <form onSubmit={handleRegister} className="mt-6 mb-0 space-y-4">
              <p className="text-center text-lg font-medium ">
                Create your new account
              </p>

              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="name"
                    id="name"
                    className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-xs"
                    placeholder="Name"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-xs"
                    placeholder="Enter email"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="username"
                    id="username"
                    className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-xs"
                    placeholder="Username"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    type="password"
                    id="password"
                    className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-xs"
                    placeholder="Password"
                    autoComplete="off"
                  />
                </div>
              </div>

              <RadioGroup
                value={role}
                onValueChange={setRole}
                name="role"
                label="Select your role"
                orientation="vertical"
                color="success"
              >
                <Radio value="admin">Admin</Radio>
                <Radio value="employee">Employee</Radio>
              </RadioGroup>

              <button
                type="submit"
                className="block w-full rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium text-white"
              >
                Sign up
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have account? {""}
                <a
                  className="hover:underline hover:text-emerald-600 text-emerald-500"
                  href="/login"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
