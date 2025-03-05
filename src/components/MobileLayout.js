import React from "react";

const MobileLayout = ({ children }) => {
  return (
    <div className="max-w-[390px] w-full h-[100vh] mx-auto bg-gray-100 overflow-hidden">
      {children}
    </div>
  );
};

export default MobileLayout;
