"use client";

import * as React from "react";
import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  Briefcase,
  CalendarDays,
  ChevronsUpDown,
  CircleUserRound,
  Command,
  CreditCard,
  Frame,
  GalleryVerticalEnd,
  House,
  Info,
  LogOut,
  Map,
  MoreHorizontal,
  Newspaper,
  Phone,
  PieChart,
  Plus,
  Settings2,
  Sparkles,
  SquareTerminal,
  UserRoundPen,
  Users,
} from "lucide-react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "../../../components/ui/sidebar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useGetUserInfo } from "../../../hooks/tanstack/useAlumni";

// This is sample data.
const data = {
  user: {
    name: "Atik Hasan",
    email: "21201063@uap-bd.edu",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Alumni Portal",
      logo: GalleryVerticalEnd,
      plan: "UAP",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

let sidebarDataStatic = [
  // group --  menu
  {
    id: 100,
    title: "Menu",
    items: [
      {
        id: 1,
        title: "Home",
        href: "/",
        icon: House,
        tooltip: "Home",
      },

      // All Profile
      {
        id: 2,
        title: "Profile",
        href: "/portal/profile",
        icon: CircleUserRound,
        tooltip: "Profile",
      },

      // My Profile
      // {
      //   id: 3,
      //   title: "My Profile",
      //   href: "/portal/my-profile",
      //   icon: UserRoundPen,
      //   tooltip: "My Profile",
      // },
    ],
  },

  // group -- alumni
  {
    id: 200,
    title: "Alumni",
    items: [
      {
        id: 4,
        title: "Alumni List",
        href: "/portal/alumni-list",
        icon: Users,
        tooltip: "Alumni List",
      },
      {
        id: 5,
        title: "Students",
        href: "/portal/students",
        icon: Users,
        tooltip: "Students",
      },
      {
        id: 6,
        title: "Events",
        href: "/portal/events",
        icon: CalendarDays,
        tooltip: "Events",
      },

      // jobs
      {
        id: 7,
        title: "Jobs",
        href: "/portal/job-list",
        icon: Briefcase,
        tooltip: "Jobs",
      },

      // {
      //   id: 8,
      //   title: "Alumni Requests",
      //   href: "/portal/alumni-requests",
      //   icon: Users,
      //   tooltip: "Alumni Requests",
      // },
    ],
  },

  // group -- about
  {
    id: 300,
    title: "About",
    items: [
      {
        id: 8,
        title: "About Alumni",
        href: "/portal/about-alumni",
        icon: Info,
        tooltip: "About Alumni",
      },

      // comittee
      // {
      //   id: 9,
      //   title: "Committee",
      //   href: "/portal/committee",
      //   icon: Users,
      //   tooltip: "Committee",
      // },

      // contact
      {
        id: 10,
        title: "Contact",
        href: "/portal/contact",
        icon: Phone,
        tooltip: "Contact",
      },
    ],
  },
];

export function AppSidebar({ children }) {
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
  const [sidebarData, setSidebarData] = React.useState(sidebarDataStatic);

  const { data: session } = useSession();
  // const { data: user, isLoading } = useGetUserInfo();
  const isSuperUser = session?.user?.user_info?.user?.is_superuser;
  // console.log(isSuperUser);
  // console.log("session", session);

  React.useEffect(() => {
    if (isSuperUser) {
      //  href: "/portal/alumni-requests";

      let newSidebarData = sidebarDataStatic;
      // newSidebarData[1].items.push({
      //   id: 8,
      //   title: "Alumni Requests",
      //   href: "/portal/alumni-requests",
      //   icon: Users,
      //   tooltip: "Alumni Requests",
      // });

      newSidebarData[1].items = newSidebarData[1].items.filter((item) => {
        return item.title !== "Alumni Requests";
      });

      newSidebarData[1].items = [
        ...newSidebarData[1].items,
        {
          id: 8,
          title: "Alumni Requests",
          href: "/portal/alumni-requests",
          icon: Users,
          tooltip: "Alumni Requests",
        },
      ];

      // console.log(newSidebarData);

      setSidebarData(newSidebarData);
    } else {
      // let newSidebarData = sidebarData;
      // let alumniSidebarData = newSidebarData[1];
      // alumniSidebarData.items = alumniSidebarData.items.filter((item) => {
      //   return item.href !== "/portal/alumni-requests";
      // });
      // setSidebarData(newSidebarData);
    }
  }, [session]);

  return (
    <>
      <Sidebar
        className="bg-[--sidebar-bg] text-white"
        side="left"
        collapsible="icon"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <activeTeam.logo className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {activeTeam.name}
                      </span>
                      <span className="truncate text-xs">
                        {activeTeam.plan}
                      </span>
                    </div>
                    {/* <ChevronsUpDown className="ml-auto" /> */}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                {/* <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  align="start"
                  side="bottom"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Shortcuts
                  </DropdownMenuLabel>

                  
                  {data.teams.map((team, index) => (
                    <DropdownMenuItem
                      key={team.name}
                      onClick={() => setActiveTeam(team)}
                      className="gap-2 p-2"
                    >
                      <div className="flex size-6 items-center justify-center rounded-sm border">
                        <team.logo className="size-4 shrink-0" />
                      </div>
                      {team.name}
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                      <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">
                      Add team
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent> */}
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {/* <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuButton tooltip="Home">
                <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                <span>Home</span>
              </SidebarMenuButton>

              {sidebarData.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.tooltip} asChild>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup> */}

          {sidebarData.map((group) => {
            return (
              <SidebarGroup key={group?.id}>
                <SidebarGroupLabel>{group?.title}</SidebarGroupLabel>
                <SidebarMenu>
                  {group?.items.map((item) => (
                    <SidebarMenuItem key={item?.id}>
                      <SidebarMenuButton
                        id={item?.id + item?.title}
                        tooltip={item?.tooltip}
                        asChild
                      >
                        <Link href={item?.href}>
                          <item.icon />
                          <span>{item?.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            );
          })}

          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            {/* <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {data.projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg"
                      side="bottom"
                      align="end"
                    >
                      <DropdownMenuItem>
                        <Folder className="text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Forward className="text-muted-foreground" />
                        <span>Share Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton className="text-sidebar-foreground/70">
                  <MoreHorizontal className="text-sidebar-foreground/70" />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu> */}
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    id="user"
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg flex items-center">
                      {/* <AvatarImage
                        src={data.user.avatar}
                        alt={data.user.name}
                      /> */}

                      <CircleUserRound size={28} />
                      {/* <AvatarFallback className="rounded-lg">CN</AvatarFallback> */}
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {session?.user?.user_info?.first_name +
                          " " +
                          session?.user?.user_info?.last_name}
                      </span>
                      <span className="truncate text-xs">
                        {session?.user?.user_info?.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-auto rounded-lg flex items-center">
                        <CircleUserRound size={20} />
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {session?.user?.user_info?.first_name +
                            " " +
                            session?.user?.user_info?.last_name}
                        </span>
                        <span className="truncate text-xs">
                          {session?.user?.user_info?.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      {session?.user?.role?.role_name}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link className="cursor-pointer" href={"/portal/profile"}>
                      <DropdownMenuItem id="account">
                        <BadgeCheck />
                        Account
                      </DropdownMenuItem>
                    </Link>
                    {/* <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem> */}
                    <DropdownMenuItem
                      id="notifications"
                      onClick={() => {
                        enqueueSnackbar("Feature coming soon", {
                          variant: "default",
                        });
                      }}
                    >
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    id="logout"
                    onClick={() => signOut()}
                  >
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      {children}
    </>
  );
}
