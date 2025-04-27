"use client";
import React from "react";

import { AppSidebar } from "../components/portal/layout/app-sidebar";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebarInset } from "../components/portal/layout/app-sidebar-inset";

const PortalProvider = ({ children }) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar>
          <AppSidebarInset>{children}</AppSidebarInset>
        </AppSidebar>
      </SidebarProvider>
    </div>
  );
};

export default PortalProvider;
