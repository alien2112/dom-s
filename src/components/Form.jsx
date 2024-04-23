import React, { useState } from "react";

function Form({theme}) {
  const [action, setAction] = useState("Login");

  return (
    <div className="min-h-screen max-w-sm mx-auto">
      <div className="header">
        <div className="text-center p-2 text-xl">
          {action === "Login" ? "Welcome back" : "Register"}
        </div>
      </div>
      <div className="inputs">
        {action === "Sign up" && (
          <div className="mb-5">
            <label
              htmlFor="name"
              className={`block mb-2 text-sm font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder=""
              required
            />
          </div>
        )}
        <div className="mb-5">
          <label
            htmlFor="email"
            className={`block mb-2 text-sm font-medium ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder=""
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className={`block mb-2 text-sm font-medium ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
      </div>
      {action === "Sign up" && (
        <div className="mb-5">
          <label
            htmlFor="repeat-password"
            className={`block mb-2 text-sm font-medium ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Repeat password
          </label>
          <input
            type="password"
            id="repeat-password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
      )}
      <div className="forgot-password">
        {action === "Login" ? (
          <>
            Forgot password <span>click</span>
          </>
        ) : null}
      </div>
      <div className="submit-container">
        <div
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
            theme === "dark" ? "dark:bg-blue-600" : ""
          } m-1 ${
            action === "Sign up" ? "dark:hover:bg-blue-700 dark:focus:ring-blue-800" : ""
          }`}
          onClick={() => {
            setAction("Sign up");
          }}
        >
          Sign up
        </div>
        <div
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
            theme === "dark" ? "dark:bg-blue-600" : ""
          } m-1 ${
            action === "Login" ? "dark:hover:bg-blue-700 dark:focus:ring-blue-800" : ""
          }`}
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default Form;
