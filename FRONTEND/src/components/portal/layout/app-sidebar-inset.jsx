// import { SidebarInset } from "../ui/sidebar";

// import { Separator } from "../../components/ui/separator";
import { Separator } from "../../../components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb";
// import Socials from "@/components/socials";
import {
  SidebarMenuButton,
  SidebarTrigger,
} from "../../../components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { SidebarInset } from "../../../components/ui/sidebar";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { ChevronsUpDown, SunMoon } from "lucide-react";

export function AppSidebarInset({ children }) {
  const { theme, setTheme } = useTheme();

  console.log(theme);

  return (
    <SidebarInset className="overflow-x-hidden ">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between border-b dark:bg-[--sidebar-bg]  ">
        <div className="flex items-center gap-2 px-4 ">
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger id="trigger" className="-ml-1" />
            </TooltipTrigger>
            <TooltipContent side="bottom" align="start">
              Toggle Sidebar <kbd className="ml-2">⌘+b</kbd>
            </TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                {/* <BreadcrumbPage className="block md:hidden">
                  Sidebar is only resizable on desktop
                </BreadcrumbPage> */}
                <BreadcrumbPage className="hidden md:block">
                  Alumni Portal
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="mr-2 sm:mr-4">
          {/* Theme switcher */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                id="variant"
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground border-none outline-none">
                  <SunMoon className="size-4" />
                </div>
                {/* <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Select Theme</span>
                  <span className="truncate text-xs">sub text</span>
                </div> */}
                {/* <ChevronsUpDown className="ml-auto" /> */}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="end"
              side="top"
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Themes
              </DropdownMenuLabel>
              {[
                {
                  name: "Light",
                  // logo: null,
                  key: "light",
                },
                {
                  name: "Dark",
                  // logo: null,
                  key: "dark",
                },
                {
                  name: "System",
                  // logo: null,
                  key: "system",
                },
              ].map((theme, index) => (
                <DropdownMenuItem
                  id={theme.name}
                  key={theme.name}
                  onClick={() => setTheme(theme.key)}
                  className="gap-2 p-2"
                >
                  {/* <div className="flex size-6 items-center justify-center rounded-sm border">
                    logo <team.logo className="size-4 shrink-0" />
                  </div> */}
                  {theme.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="sm:p-5 py-5 h-[93vh] overflow-y-auto bg-[--base-bg]  dark:bg-[--light-bg-dark]">
        {children}
      </div>
    </SidebarInset>
  );
}
