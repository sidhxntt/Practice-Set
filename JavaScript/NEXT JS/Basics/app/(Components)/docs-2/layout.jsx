'use client'
import React, { useState } from "react";

const Layout = ({ children, content1, content2, content3 }) => {
  const [login, setLogin] = useState(false);

  return (
    <>
      {login ? (
        <div>
          {children}
          {content1}
          {content2}
          {content3}
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <button
            onClick={() => {
              setLogin(true);
            }}
          >
            Login
          </button>
        </div>
      )}
    </>
  );
};

export default Layout;
