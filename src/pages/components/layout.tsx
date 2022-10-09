import React from "react";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className="min-w-screen container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      {children}
    </main>
  );
};

export default Layout;
