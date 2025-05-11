import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <div className="m-4 p-6 bg-white rounded-lg">{children}</div>;
};

export default PageContainer;
