"use client";
import React from "react";
import { useRecoilState } from "recoil";
import { authenticated } from "@/recoil/atom";

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authenticated);

  return (
    <div>
      {isAuthenticated ? (
        <div>Authenticated</div>
      ) : (
        <div>Not Authenticated</div>
      )}
    </div>
  );
};

export default Page;