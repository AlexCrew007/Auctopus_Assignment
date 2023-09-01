import * as Yup from 'yup'


export const LoginSchema =  Yup.object({
    email : Yup.string().email().min(5).max(20).required("Please enter your email"),
    password : Yup.string().min(8).required("Please enter your password"),
})