import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between items-center h-screen bg-kioskBackground">
      {children}
    </div>
  );
};

export default Layout;
