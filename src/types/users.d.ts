export type UserType = {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    address: string;
    gender: "Male" | "Female" | "Others";
    department: "Engineering" | "Marketing" | "Sales" | "HR" | "R&D" | "Training" | "Support" | "Accounting";
    status: "Active" | "Inactive";
    type: "Admin" | "Author" | "User";
};