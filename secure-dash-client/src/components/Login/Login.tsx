import React from 'react';

export const Login = () => {
  return (
    <>
      <div>Login</div>
      <div className="w-full">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
      </div>
    </>
  );
};
