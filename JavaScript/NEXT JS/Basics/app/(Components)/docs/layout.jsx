"use client";
import Content1 from "./_contents/content1";
import Content2 from "./_contents/content2";
import Content3 from "./_contents/content3";
import Login from "./_contents/Login";

import { useState } from "react";

const layout = ({ children }) => {
  const [login, setLogin] = useState(true);

  return (
    <>
      {login ? (
        <Login setLogin={setLogin} />
      ) : (
        <div className="layout">
          <h1>{children}</h1>
          <Content1 />
          <Content2 />
          <Content3 />
        </div>
      )}
    </>
  );
};

export default layout;
