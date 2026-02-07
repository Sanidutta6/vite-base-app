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
} from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";

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
                        {/* {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>} */}
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
        </Sidebar>
    );
}