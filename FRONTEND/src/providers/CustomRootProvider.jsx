"use client";

// import Footer from "@/components/shared/Footer";
// import Header from "@/components/shared/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
const AppProgressBar = dynamic(
  () => import("next-nprogress-bar").then((mod) => mod.AppProgressBar),
  {
    ssr: true,
  }
);
const SnackbarProvider = dynamic(
  () => import("notistack").then((mod) => mod.SnackbarProvider),
  {
    ssr: true,
  }
);

// const queryClient = new QueryClient();

const CustomRootProvider = ({ children, session }) => {
  //

  const [queryClient] = useState(() => new QueryClient());

  // const { theme, setTheme } = useTheme();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <SessionProvider session={session}>
            <AppProgressBar
              height="3px"
              color="#805ad5"
              options={{ showSpinner: false }}
              shallowRouting
            />
            {/* <Header /> */}

            <ThemeProvider
              enableSystem
              attribute="class"
              defaultTheme="light"
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            {/* <Footer /> */}
          </SessionProvider>
        </SnackbarProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  );
};

export default CustomRootProvider;
