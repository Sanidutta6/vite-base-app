import { useEffect, useState } from "react";
import {
    ArrowRight,
    Binoculars,
    ChevronRight,
    Home,
    SquareLibrary,
    Users,
    BookCheck,
    Shell,
    type LucideIcon,
    ChevronsUpDown,
    Sparkles,
    BadgeCheck,
    CreditCard,
    Bell,
    LogOut,
} from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// Type definitions
interface NavItem {
    title: string;
    icon?: LucideIcon;
    url?: string;
    permissions: string[];
    items?: NavItem[];
}

interface NavGroup {
    label: string;
    items: NavItem[];
}

interface SidebarNavConfigType {
    groups: NavGroup[];
}

// Navigation configuration with type annotation
const SidebarNavConfig: SidebarNavConfigType = {
    groups: [
        {
            label: "",
            items: [
                {
                    title: "Dashboard",
                    icon: Home,
                    url: "/dashboard",
                    permissions: [""],
                },
                {
                    title: "Requisition",
                    icon: Binoculars,
                    permissions: [""],
                    items: [
                        {
                            title: "Entry Form",
                            url: "/missing-entry",
                            permissions: [""],
                        },
                        {
                            title: "Requisition List",
                            url: "/missing-list",
                            permissions: [""],
                        },
                    ],
                },
                {
                    title: "Register",
                    icon: SquareLibrary,
                    permissions: [""],
                    items: [
                        {
                            title: "Register List",
                            url: "/register-list",
                            permissions: [""],
                        },
                        {
                            title: "Recovery Entry",
                            url: "/missing-recovery-entry",
                            permissions: [""],
                        },
                    ],
                },
                {
                    title: "Users",
                    icon: Users,
                    permissions: [""],
                    items: [
                        {
                            title: "User List",
                            url: "/users",
                            permissions: [""],
                        },
                        {
                            title: "Permissions",
                            url: "/permission-list",
                            permissions: [""],
                        },
                    ],
                },
                {
                    title: "Follow Up Actions",
                    icon: BookCheck,
                    url: "/actions",
                    permissions: [""],
                },
            ],
        },
    ],
};

const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
};

export function AppSidebar() {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const location = useLocation();

    const userPermissions: string[] = [""];

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);

        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    const isActive = (url?: string): boolean => {
        if (!url) return false;
        return location.pathname === url;
    };

    const isActiveParent = (items: NavItem[]): boolean => {
        return items.some((item) => isActive(item.url));
    };

    const hasPermission = (requiredPermissions: string[]): boolean => {
        return requiredPermissions.every((permission) =>
            userPermissions.includes(permission)
        );
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <div className="flex items-center">
                                <Shell className="size-6" />
                                <h1 className="ml-2 text-lg font-bold">My App</h1>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {SidebarNavConfig.groups.map((group: NavGroup, groupIndex: number) => (
                    <SidebarGroup
                        key={groupIndex}
                        className={
                            groupIndex === 1 ? "group-data-[collapsible=icon]:hidden" : ""
                        }
                    >
                        <SidebarMenu>
                            {group.items
                                .filter((item) => hasPermission(item.permissions || []))
                                .map((item: NavItem) => (
                                    <SidebarMenuItem key={item.title}>
                                        {item.items && item.items.length > 0 ? (
                                            <Collapsible
                                                defaultOpen={isActiveParent(item.items)}
                                                className="group/collapsible"
                                            >
                                                <CollapsibleTrigger
                                                    render={
                                                        <SidebarMenuButton
                                                            tooltip={item.title}
                                                        >
                                                            {item.icon && <item.icon className="size-4" />}
                                                            <span>{item.title}</span>
                                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                        </SidebarMenuButton>
                                                    }
                                                />
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.items
                                                            .filter((subItem) =>
                                                                hasPermission(subItem.permissions || [])
                                                            )
                                                            .map((subItem: NavItem) => (
                                                                <SidebarMenuSubItem key={subItem.title}>
                                                                    <SidebarMenuSubButton
                                                                        render={
                                                                            <Link to={subItem.url || "#"}>
                                                                                <ArrowRight />
                                                                                <span>{subItem.title}</span>
                                                                            </Link>
                                                                        }
                                                                    />
                                                                </SidebarMenuSubItem>
                                                            ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        ) : (
                                            <SidebarMenuButton
                                                title={item.title}
                                                render={
                                                    <Link to={item.url || "#"}>
                                                        {item.icon && <item.icon className="size-4" />}
                                                        <span>{item.title}</span>
                                                    </Link>
                                                }
                                            />
                                        )}
                                    </SidebarMenuItem>
                                ))}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{user.name}</span>
                                            <span className="truncate text-xs">{user.email}</span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                }
                            />
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-medium">{user.name}</span>
                                                <span className="truncate text-xs">{user.email}</span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Sparkles />
                                        Upgrade to Pro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>

            </SidebarFooter>
        </Sidebar>
    );
}