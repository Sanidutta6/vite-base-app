import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { UserType } from "@/@types/users"

type UserFormData = Omit<UserType, 'id'>;

interface UserFormProps {
    user?: UserType;
    onSubmit: (data: UserType) => void;
    onCancel?: () => void;
    isSubmitting?: boolean;
}

const UserForm = ({ user, onSubmit, onCancel, isSubmitting = false }: UserFormProps) => {
    const isEditMode = !!user;

    const [formData, setFormData] = useState<UserFormData>({
        name: "",
        email: "",
        phone: "",
        avatar: "",
        address: "",
        gender: "Male",
        department: "Engineering",
        status: "Active",
        type: "User",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

    // Load user data when editing
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                address: user.address,
                gender: user.gender,
                department: user.department,
                status: user.status,
                type: user.type,
            });
        }
    }, [user]);

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof UserFormData, string>> = {};

        if (!formData.name || formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!formData.phone || formData.phone.length < 10) {
            newErrors.phone = "Phone number must be at least 10 characters";
        }

        if (formData.avatar && formData.avatar.length > 0) {
            try {
                new URL(formData.avatar);
            } catch {
                newErrors.avatar = "Must be a valid URL";
            }
        }

        if (!formData.address || formData.address.length < 5) {
            newErrors.address = "Address must be at least 5 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit({ ...formData, id: user?.id || "" });
        }
    };

    const handleInputChange = (field: keyof UserFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FieldGroup>
                {/* Avatar Preview */}
                <div className="flex justify-center pb-4">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={formData.avatar} alt={formData.name} />
                        <AvatarFallback className="text-2xl">
                            {formData.name ? getInitials(formData.name) : "U"}
                        </AvatarFallback>
                    </Avatar>
                </div>

                {/* Basic Information */}
                <FieldSet>
                    <FieldLegend>Basic Information</FieldLegend>
                    <FieldDescription>
                        Enter the user's personal details
                    </FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="user-name">Full Name *</FieldLabel>
                            <Input
                                id="user-name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                required
                            />
                            {errors.name && (
                                <FieldDescription className="text-destructive">
                                    {errors.name}
                                </FieldDescription>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="user-email">Email *</FieldLabel>
                            <Input
                                id="user-email"
                                type="email"
                                placeholder="john.doe@example.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                required
                            />
                            {errors.email && (
                                <FieldDescription className="text-destructive">
                                    {errors.email}
                                </FieldDescription>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="user-phone">Phone Number *</FieldLabel>
                            <Input
                                id="user-phone"
                                placeholder="770-979-8156"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                required
                            />
                            {errors.phone && (
                                <FieldDescription className="text-destructive">
                                    {errors.phone}
                                </FieldDescription>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="user-avatar">Avatar URL</FieldLabel>
                            <Input
                                id="user-avatar"
                                placeholder="https://example.com/avatar.png"
                                value={formData.avatar}
                                onChange={(e) => handleInputChange('avatar', e.target.value)}
                            />
                            {errors.avatar && (
                                <FieldDescription className="text-destructive">
                                    {errors.avatar}
                                </FieldDescription>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="user-address">Address *</FieldLabel>
                            <Input
                                id="user-address"
                                placeholder="22 Truax Street"
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                required
                            />
                            {errors.address && (
                                <FieldDescription className="text-destructive">
                                    {errors.address}
                                </FieldDescription>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="user-gender">Gender *</FieldLabel>
                            <Select
                                value={formData.gender}
                                onValueChange={(value) => handleInputChange('gender', value as UserType['gender'])}
                            >
                                <SelectTrigger id="user-gender">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Others">Others</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                </FieldSet>

                <FieldSeparator />

                {/* Work Information */}
                <FieldSet>
                    <FieldLegend>Work Information</FieldLegend>
                    <FieldDescription>
                        Enter the user's professional details
                    </FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="user-department">Department *</FieldLabel>
                            <Select
                                value={formData.department}
                                onValueChange={(value) => handleInputChange('department', value as UserType['department'])}
                            >
                                <SelectTrigger id="user-department">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Engineering">Engineering</SelectItem>
                                        <SelectItem value="Marketing">Marketing</SelectItem>
                                        <SelectItem value="Sales">Sales</SelectItem>
                                        <SelectItem value="HR">HR</SelectItem>
                                        <SelectItem value="R&D">R&D</SelectItem>
                                        <SelectItem value="Training">Training</SelectItem>
                                        <SelectItem value="Support">Support</SelectItem>
                                        <SelectItem value="Accounting">Accounting</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="user-type">User Type *</FieldLabel>
                            <Select
                                value={formData.type}
                                onValueChange={(value) => handleInputChange('type', value as UserType['type'])}
                            >
                                <SelectTrigger id="user-type">
                                    <SelectValue placeholder="Select user type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="User">User</SelectItem>
                                        <SelectItem value="Author">Author</SelectItem>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="user-status">Status *</FieldLabel>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => handleInputChange('status', value as UserType['status'])}
                            >
                                <SelectTrigger id="user-status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                </FieldSet>

                {/* Form Actions */}
                <Field orientation="horizontal">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : isEditMode ? "Update User" : "Create User"}
                    </Button>
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                    )}
                </Field>
            </FieldGroup>
        </form>
    );
};

export default UserForm;