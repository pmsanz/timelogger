import React, { FC } from "react";
import { Link } from "react-router-dom";
import LogOutIcon from "../Logout-icon";

const NavHorizontal: FC = () => {
  return (
    <nav className="flex sticky py-4 px-4 justify-between items-center border-solid border">
      <Link to={"/"} className="font-bold text-xl">
        My TimeLogger
      </Link>
      <div className="flex items-center justify-center space-x-4">
        <Link to={"/"} className="nav-item">
          Home
        </Link>
        <Link to={"/create"} className="nav-item">
          New Project
        </Link>
        <Link className="btn-primary" to={"/login"}>
          <span>Log out</span>
          <LogOutIcon width={16} color="#fff" />
        </Link>
      </div>
    </nav>
  );
};

export default NavHorizontal;
