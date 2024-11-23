// valid phone number Ex : axfRE12@# values = [6-16]
export const checkValidPassword = (password) => {
    let validPassword = new RegExp(`^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$`);
    return validPassword.test(password);
}

// valid email address 
export const checkValidemail = (email) => {
    let validMail = new RegExp(`^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$`);
    return validMail.test(email);
}
