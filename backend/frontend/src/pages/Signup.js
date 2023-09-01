
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {  useFormik } from 'formik';
import { SignupSchema } from '../schemas/SignupSchema';
import { useUserSignupMutation } from '../redux/services/api';
import { useEffect } from 'react';


export function Signup() {
  
  const navigate = useNavigate()

  const initialValues = {
    username : '',
    name : '',
    email : '',
    phone : '',
    password : '',
    confirm_password : '',
    address : '',
    college: '',
  
  }
  
  const [register, { data,  isSuccess, isError, error} ] = useUserSignupMutation()

  const { values, touched, handleChange, handleSubmit, errors} = useFormik( {

    initialValues :initialValues,
    validationSchema : SignupSchema,
    onSubmit : (values) =>{
      register(values)
    }
  })
  useEffect(()=>{
    if(isSuccess){
      navigate('/login')
      toast.success('User Registration Successfull')
    }
    if(isError){
      console.log(isError,error)
      toast.error('Please enter unique username and email')
    }
  },[isSuccess,isError])
  
  return (
    <div className='flex flex-col gap-x-4' >
    <div className=' flex flex-col  justify-center items-center'>

      <form className='flex flex-col' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-x-4 mt-[10px]'>
          <label className='w-full text-[0.875rem] text-slate-900 mb-1 leading-[1.375rem]' htmlFor='usernanme'>Enter Username</label>
          <input  className='bg-slate-800 rounded-[0.5rem] text-slate-200 w-1/full p-[12px]' id='username' type="text" name="username"  placeholder="Username"  value={values.username} onChange={handleChange} />
        </div>
        {<p>{ errors.username && touched.username ? errors.username : null }</p>}
        <div  className='flex flex-col gap-x-4 mt-[10px]'>
          <label className='w-full text-[0.875rem] text-slate-900 mb-1 leading-[1.375rem]' htmlFor='name'>Enter Name</label>
          <input className='bg-slate-800 rounded-[0.5rem] text-slate-200 w-1/full p-[12px]' id='name' type="text" name="name" placeholder="Enter Name" value={values.name}  onChange={handleChange} />
        </div>
        {<p>{ errors.name && touched.name ? errors.name : null }</p>}
        <div className='flex flex-col gap-x-4 mt-[10px]'>
          <label className='w-full text-[0.875rem] text-slate-900 mb-1 leading-[1.375rem]' htmlFor='email'>Enter Email</label>
          <input className='bg-slate-800 rounded-[0.5rem] text-slate-200 w-1/full p-[12px]' id='email' type="email" name="email" placeholder="example@xyz.com" value={values.email} onChange={handleChange} />
        </div>
        {<p>{ errors.email && touched.email ? errors.email : null }</p>}
        <div  className='flex flex-col gap-x-4 mt-[10px]'>
          <label className='w-full text-[0.875rem] text-slate-900 mb-1 leading-[1.375rem]' htmlFor='phone'>Enter Phone number</label>
          <input className='bg-slate-800 rounded-[0.5rem] text-slate-200 w-1/full p-[12px]' id='phone' type="text" name="phone" placeholder="Confirm Password" value={values.phone}  onChange={handleChange} />
        </div>
        {<p>{ errors.phone && touched.phone ? errors.phone : null }</p>}
        
        <div  className='flex flex-col gap-x-4 mt-[10px]'>
          <label className='w-full text-[0.875rem] text-slate-900 mb-1 leading-[1.375rem]' htmlFor='password'>Enter Password</label>
          <input className='bg-slate-800 rounded-[0.5rem] text-slate-200 w-1/full p-[12px]' id='password' type="password" name="password" placeholder="Password" value={values.password}  onChange={handleChange} />
        </div>
        {<p>{ errors.password && touched.password ? errors.password : null }</p>}
        <div  className='flex flex-col gap-x-4 mt-[10px]'>
          <label className='w-full text-[0.875rem] text-slate-900 mb-1 leading-[1.375rem]' htmlFor='confirm_password'>Confirm Password</label>
          <input className='bg-slate-800 rounded-[0.5rem] text-slate-200 w-1/full p-[12px]' id='confirm_password' type="password" name="confirm_password" placeholder="Confirm Password" value={values.confirm_password}  onChange={handleChange} />
        </div>
        {<p>{ errors.confirm_password && touched.confirm_password ? errors.confirm_password : null }</p>}
        <div  className='flex flex-col gap-x-4 mt-[10px]'>
          <label className='w-full text-[0.875rem] text-slate-900 mb-1 leading-[1.375rem]' htmlFor='address'>Address</label>
          <input className='bg-slate-800 rounded-[0.5rem] text-slate-200 w-1/full p-[12px]' id='address' type="text" name="address" placeholder="Enter Address" value={values.address}  onChange={handleChange} />
        </div>
        {<p>{ errors.address && touched.address ? errors.address : null }</p>}
        <div  className='flex flex-col gap-x-4 mt-[10px]'>
          <label className='w-full text-[0.875rem] text-slate-900 mb-1 leading-[1.375rem]' htmlFor='college'>College Name</label>
          <input className='bg-slate-800 rounded-[0.5rem] text-slate-200 w-1/full p-[12px]' id='college' type="text" name="college" placeholder="College Name" value={values.college}  onChange={handleChange} />
        </div>
        {<p>{ errors.confirm_password && touched.confirm_password ? errors.confirm_password : null }</p>}
        
        <div  className='flex flex-col gap-x-4 mt-[10px]'>
          <button className='w-full bg-yellow-400 rounded-[8px] font-medium text-slate-900 px-[12px] py-[8px] mt-3' type="submit">Sign Up</button>
        </div>
        
      </form>
       
    </div>
    </div>
  );
}

export default Signup;
