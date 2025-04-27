import PortalProvider from "../../providers/PortalProvider";
import React from "react";

const layout = ({ children }) => {
  return <PortalProvider>{children}</PortalProvider>;
};

export default layout;
