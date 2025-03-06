import React from "react";

const MobileLayout = ({ children }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-200">
      <div className="max-w-[390px] w-full h-[100vh] bg-white shadow-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
