import React from "react";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <div>{children}</div>
      <div>Here is sidebar</div>
    </div>
  );
}

export default MainLayout;
