import React from "react";

const BackgroundGlow = ({ children }) => {
  return ( 
    <div className="relative h-full w-full">
      {/* Background layer */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]" />

      {/* Foreground content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundGlow;
