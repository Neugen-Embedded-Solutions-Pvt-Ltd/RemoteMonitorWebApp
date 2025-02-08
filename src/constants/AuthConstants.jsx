export const loginConstants = [
    {
        id: 'username_input',
        labelText: "User Name",
        labelClass: "text-lg mb-2",
        inputType: "text",
        inputName: "username",
        inputPlaceholder: "Enter username",
        inputClass: "border rounded-md bg-transparent p-2 w-inputBox",
        isRequired: true,
    },
    {
        id: 'password_input',
        labelText: "Password",
        labelClass: "text-lg mb-2",
        inputType: "password",
        inputName: "password",
        inputPlaceholder: "Enter password",
        inputClass: "border rounded-md bg-transparent p-2 w-inputBox",
        isRequired: true,
    }
]
export const registerConstants = [
    {
        id: 'device_id_input',
        labelText: "Device ID",
        labelClass: "text-sm mb-2",
        inputType: "text",
        inputName: "device_d",
        inputPlaceholder: "Enter device id",
        inputClass: "border rounded-md bg-transparent p-2 w-inputBox",
        isRequired: true,
    },
    {
        id: 'username_input',
        labelText: "First Name",
        labelClass: "text-sm mb-2",
        inputType: "text",
        inputName: "first_name",
        inputPlaceholder: "Enter first name",
        inputClass: "border rounded-md bg-transparent p-2 w-inputBox",
        isRequired: true,
    },
    {
        id: 'username_input',
        labelText: "Last Name",
        labelClass: "text-sm mb-2",
        inputType: "text",
        inputName: "last_name",
        inputPlaceholder: "Enter last name",
        inputClass: "border rounded-md bg-transparent p-2 w-inputBox",
        isRequired: true,
    },
    {
        id: 'username_email',
        labelText: "Enter your email address to receive a password reset link",
        labelClass: "text-sm pb-2",
        inputType: "email",
        inputName: "email",
        inputPlaceholder: "Enter email",
        inputClass: "border rounded-md bg-transparent p-2 w-inputBox",
        isRequired: true,
    },
    {
        id: 'username_input',
        labelText: "User Name",
        labelClass: "text-sm mb-2",
        inputType: "text",
        inputName: "username",
        inputPlaceholder: "Enter username",
        inputClass: "border rounded-md bg-transparent p-2 w-inputBox",
        isRequired: true,
    },
    {
        id: 'password_input',
        labelText: "Password",
        labelClass: "text-sm mb-2",
        inputType: "password",
        inputName: "password",
        inputPlaceholder: "Enter password",
        inputClass: "border rounded-md bg-transparent p-2 w-inputBox",
        isRequired: true,
    }
]
export const forgotPasswordConstants = [
    {
        id: 'username_email',
        labelText: "Enter your email address to receive a password reset link",
        labelClass: "text-sm pb-2",
        spanClassName:"hidden",
        inputType: "email",
        inputName: "email",
        inputPlaceholder: "",
        inputClass: "border rounded-md bg-transparent p-2",
        isRequired: true,
    },
]

export const resetPasswordConstants = [
    {
        id: 'username_input',
        labelText: "",
        labelClass: "hidden",
        inputType: "password",
        inputName: "password",
        inputPlaceholder: "New Password",
        inputClass: "border rounded-md bg-transparent px-3 py-2 w-inputBox ",
        isRequired: true,
    },
    {
        id: 'password_input',
        labelText: "",
        labelClass: "hidden",
        inputType: "password",
        inputName: "confirm_password",
        inputPlaceholder: "Re-Enter password",
        inputClass: "border rounded-md bg-transparent px-3 py-2 w-inputBox ",
        isRequired: true,
    }
]