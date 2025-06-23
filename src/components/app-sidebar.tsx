"use client";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Manage Products",
      items: [
        {
          title: "Add new Products",
          url: "/add",
        },
        {
          title: "Modify Existing Product",
          url: "/modify",
        },
        {
          title: "Manage Stock",
          url: "/editStock",
        },
        {
          title: "Delete Product",
          url: "/delete",
        },
      ],
    },
    {
      title: "User Orders",
      items: [
        {
          title: "All Orders",
          url: "/allOrders",
        },
        {
          title: "Pending Orders",
          url: "/pendingOrders",
        },
        {
          title: "Delivered Orders",
          url: "/deliveredOrders",
        },
      ],
    },
    {
      title: "Customers",
      url: "#",
    },
    {
      title: "Payments",
      url: "/payments",
    },
    {
      title: "Promotions",
      items: [
        {
          title: "Coupons",
          url: "/coupon",
        },
        {
          title: "Banners",
          url: "/banners",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <img
                  src="/logo/logo-dark.png"
                  alt=""
                  className="hidden dark:block w-[60%]"
                />
                <img
                  src="/logo/logo.png"
                  alt=""
                  className="dark:hidden block w-[60%]"
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname == item.url}>
                  {item.url ? (
                    <a href={item.url} className="font-medium">
                      {item.title}
                    </a>
                  ) : (
                    <div>{item.title}</div>
                  )}
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname == item.url}
                        >
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <NavUser
        user={{
          name: "Admin",
          email: "admin@grockart.store",
          avatar:
            "https://api.iconify.design/material-symbols:account-circle.svg",
        }}
      />
    </Sidebar>
  );
}
