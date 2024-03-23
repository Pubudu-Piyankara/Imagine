import React from "react";
import Sidebar from "@/components/shared/Sidebar";
import SideNavbar from "@/components/shared/SideNavbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar/>
      <SideNavbar/>
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
