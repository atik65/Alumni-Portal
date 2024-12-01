import * as Yup from "yup";

// signup schema
export const signupSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  // password: Yup.string()
  //   .required("Password is required")
  //   .min(8, "Password must be at least 8 characters long")
  //   .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  //   .matches(/[0-9]/, "Password must contain at least one number")
  //   .matches(
  //     /[@$!%*?&#]/,
  //     "Password must contain at least one special character"
  //   ),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters long"),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  // phone: Yup.string()
  //   .required("Phone number is required")
  //   .min(13, "Phone number must be 11 digits")
  //   .max(13, "Phone number must be 11 digits"),
  // otp: Yup.string().required("OTP is required"),
});

// login schema
export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),

  // password: Yup.string()
  //   .required("Password is required")
  //   .min(8, "Password must be at least 8 characters long")
  //   .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  //   .matches(/[0-9]/, "Password must contain at least one number")
  //   .matches(
  //     /[@$!%*?&#]/,
  //     "Password must contain at least one special character"
  //   ),
});

// forget password schema
export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

// verify otp schema
export const verifyOtpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  otp: Yup.string().required("OTP is required"),
});

// reset password schema - not auth user
export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  token: Yup.string().required("Token is required"),
});

// change password schema - auth user
export const changePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

// address schema
export const addressSchema = Yup.object().shape({
  division: Yup.string().required("Division is required"),
  district: Yup.string().required("District is required"),
  upazila: Yup.string().required("Upazila is required"),
  address: Yup.string().required("Address is required"),
});
