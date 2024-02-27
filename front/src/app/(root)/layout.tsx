import Sidebar from "@/components/shared/Sidebar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="root">
      {/* sidebar */}
      <Sidebar />
      {/* mobile nav */}
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
}

export default Layout;
