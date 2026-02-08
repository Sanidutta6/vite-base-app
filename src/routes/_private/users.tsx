import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { Edit, Ellipsis, PlusCircle, Trash2, Mail, Phone, MapPin, Users, Briefcase, Shield } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import usersList from "@/data/user_list.json";
import type { UserType } from '@/@types/users';
import { Button } from '@/components/ui/button';
import TablePagination from '@/components/table-pagination';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import UserForm from '@/components/user-form';



export const Route = createFileRoute('/_private/users')({
  component: RouteComponent,
});

function RouteComponent() {
  const PER_PAGE = 10;
  const tableHeader = ["ID", "Avatar", "Name", "Department", "Role", "Status", "Action"];
  const deptBadgeVariant = {
    "HR": "default",
    "Training": "secondary",
    "Marketing": "destructive",
    "Sales": "success",
    "Engineering": "warning",
    "Accounting": "info",
    "Support": "muted",
    "R&D": "premium",
  };
  const userTypeBadgeVariants = {
    "Admin": "success",
    "Author": "premium",
    "User": "info"
  };

  const [currPage, setCurrPage] = useState<number>(1);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [openUserFormDialog, setOpenUserFormDialog] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const totalPages = Math.ceil(usersList.length / PER_PAGE);
  const startPaginatedDataIdx = (currPage - 1) * PER_PAGE;
  const endPaginatedDataIdx = currPage * PER_PAGE;

  const handleUserClick = (user: UserType) => {
    setSelectedUser(user);
    setSheetOpen(true);
  };

  return (
    <div>
      <Card>
        <CardHeader className='flex items-center-safe justify-between'>
          <div>
            <CardTitle>Users List</CardTitle>
            <CardDescription>Manage List of users.</CardDescription>
          </div>
          <div>
            <Button onClick={() => { setSelectedUser(null); setOpenUserFormDialog(true); }}>
              <PlusCircle />
              <span>Add New User</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeader.map((head, idx) => (
                  <TableHead key={idx}>{head}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(usersList as UserType[]).slice(startPaginatedDataIdx, endPaginatedDataIdx).map((user, idx) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{((currPage - 1) * PER_PAGE) + (idx + 1)}</TableCell>
                  <TableCell>
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded" />
                  </TableCell>
                  <TableCell className='hover:underline underline-offset-4 cursor-pointer' onClick={() => { handleUserClick(user); }}>{user.name}</TableCell>
                  <TableCell>
                    <Badge variant={deptBadgeVariant[user.department] as any}>
                      {user.department}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={userTypeBadgeVariants[user.type] as any}>
                      {user.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "success" : "muted"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon"><Ellipsis /></Button>} />
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => { setSelectedUser(user); setOpenUserFormDialog(true); }}>
                          <Edit />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            current_page={currPage}
            total_pages={totalPages}
            onPageChange={setCurrPage}
          />
        </CardContent>
      </Card>
      <UserProfileSheet
        user={selectedUser}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
      <UserFormDialog
        open={openUserFormDialog}
        onOpenChange={setOpenUserFormDialog}
        user={selectedUser as UserType}
        onSubmit={() => { setSelectedUser(null); setOpenUserFormDialog(false); }}
        onCancel={() => { setSelectedUser(null); setOpenUserFormDialog(false); }}
        isSubmitting={false}
      />
    </div >
  );
}

const UserProfileSheet = ({
  user,
  open,
  onOpenChange
}: {
  user: UserType | null,
  open: boolean,
  onOpenChange: (open: boolean) => void;
}) => {
  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    return status.toLowerCase() === 'active'
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Admin': 'bg-purple-100 text-purple-800 border-purple-200',
      'User': 'bg-blue-100 text-blue-800 border-blue-200',
      'Manager': 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="bg-card text-card-foreground w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>User Profile</SheetTitle>
          <SheetDescription>
            Detailed information about the user
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 pl-5 space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col items-center space-y-3 pb-6 border-b">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.department}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className={getStatusColor(user.status)}>
                {user.status}
              </Badge>
              <Badge variant="outline" className={getTypeColor(user.type)}>
                <Shield className="w-3 h-3 mr-1" />
                {user.type}
              </Badge>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Contact Information
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium break-all">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-sm font-medium">{user.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Additional Details
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Gender</p>
                  <p className="text-sm font-medium">{user.gender}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p className="text-sm font-medium">{user.department}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">User ID</p>
                  <p className="text-sm font-medium font-mono">{user.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const UserFormDialog = ({
  open,
  onOpenChange,
  user,
  onSubmit,
  onCancel,
  isSubmitting
}: {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  user: UserType,
  onSubmit: (data: UserType) => void,
  onCancel: () => void,
  isSubmitting: boolean
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
          <UserForm
            user={user}
            onSubmit={onSubmit}
            onCancel={onCancel}
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}