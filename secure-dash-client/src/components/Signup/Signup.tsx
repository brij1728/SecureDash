import React from 'react';

export const Signup = () => {
  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-primary p-6 shadow-lg">
      <form className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-secondary"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="mt-1 w-full rounded-md border border-secondary bg-primary px-3 py-2 text-secondary shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-btn"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-secondary"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="mt-1 w-full rounded-md border border-secondary bg-primary px-3 py-2 text-secondary shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-btn"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-btn px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-btn focus:ring-offset-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
