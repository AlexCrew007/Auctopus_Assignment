import React, { useEffect, useState }  from 'react'
import { Navigate, json } from 'react-router-dom'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useAuthenticateMutation } from '../redux/services/api'
import { useNavigate } from 'react-router-dom'
import  { setUser } from '../redux/slices/LoginSlice'

export const Login = () => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector( (state)=> state.login.username)

  const [loginForm , setLoginForm] = useState({
    email : '',
    password : '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  const [authenticate, {data, isSuccess, isError }] = useAuthenticateMutation();

  const clikHandler = async (e) => {
    e.preventDefault()
      if(loginForm.email && loginForm.password){
        await authenticate(loginForm);
      }
      else{
        toast.error("Please enter email and passowrd")
      }
      
  };
 
  
  useEffect(() => {
    if(isError){
      toast.error("Enter Valid email and password")
    }
    if (isSuccess) {
      navigate('/');
      dispatch(setUser({ token: data.access, refreshToken: data.refresh }));
      toast.success('User logged in successfully');
    }
  }, [isSuccess,isError]);




  return (
    <div className='flex flex-col gap-x-4 '>
      {
        user ? <Navigate to={'/'}></Navigate> : 
        <div className=' flex flex-col  justify-center items-center ' >
          <div className='flex flex-col '>
            <form >
              <div className='flex flex-col gap-x-4 mt-[10px]'> 
                <label className='w-full text-[0.875rem] text-slate-900 mb-1 leading-[1.375rem]' htmlFor='email'>Enter Email : </label>
                <input className='bg-slate-800 rounded-[0.5rem] text-slate-200 w-full p-[12px]' type='email' onChange={handleChange} placeholder='example@xyz.com' id='email' name='email' value={loginForm.email}/>
                
              </div>
              <div className='flex flex-col gap-x-4 mt-[10px]'>
                <label className='w-full text-[0.875rem] text-slate-900 mb-1 leading-[1.375rem]' htmlFor='password'>Enter Password  : </label>
                <input className='bg-slate-800 rounded-[0.5rem] text-slate-200 w-1/full p-[12px]' type='password' onChange={handleChange} placeholder='password' id='password' name='password' value={loginForm.password} />
              
              </div>
              <div className='flex flex-col gap-x-4 mt-[10px]'  >
                <button className='w-full bg-yellow-400 rounded-[8px] font-medium text-slate-900 px-[12px] py-[8px] mt-3' type='submit' onClick={clikHandler}>Submit</button>  
              </div>
            </form>
        </div>
        </div>
      }
    </div>
  )
}
