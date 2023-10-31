import React, { FC } from "react";
import NavHorizontal from "./NavHorizontal";

const Layout: FC = ({ children }) => {
  return (
    <>
      <header>
        <NavHorizontal />
      </header>
      <main className="bg-gray-100" style={{ minHeight: "calc(100vh - 62px)" }}>
        {children}
      </main>
    </>
  );
};

export default Layout;
