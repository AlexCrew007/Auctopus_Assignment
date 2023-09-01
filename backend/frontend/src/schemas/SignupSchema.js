import * as Yup from "yup";


export const SignupSchema = Yup.object({
    username : Yup.string().min(5).max(20).required("Please enter your usernmae"),
    name : Yup.string().min(2).max(30).required('Please enter your name'),
    email : Yup.string().email().required("Please enter your email"),
    phone : Yup.string().min(10).max(12).required('Please enter your name'),
    password : Yup.string().min(8).required("Please enter your password"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], "Password must match")
        .required("Please confirm your password"),
    address : Yup.string().max(40).required('Please enter your address'),
    college : Yup.string().min(5).max(20).required('Plese enter your college name'),
    
});
