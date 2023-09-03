import React from 'react'
import {BsFillCartFill} from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom'
import image from '../assets/lms-icon.png'
import { useDispatch, useSelector } from 'react-redux'
import { LoginSlice } from '../redux/slices/LoginSlice'; 
import { toast } from 'react-hot-toast'
import { useFetchCartItemsQuery } from '../redux/services/api';
import { Spinner } from './Spinner'


export const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const user = useSelector( (state) => state.login.user)
  const access_token = JSON.parse(localStorage.getItem('access_token'))
  const cartItems = useFetchCartItemsQuery(access_token, {
    skip: !user, 
  });


  async function logoutHandler(e){
    e.preventDefault()
    dispatch(LoginSlice.actions.logout())
    navigate('/login')
    toast.error('logged out!')
  }
  return (
    <div>
    <nav className='flex  items-center justify-between h-20 max-w-6xl mx-auto'>
      <NavLink to={'/'}>
      <div className='ml-5'>
      <img  className='h-14' src={image} alt='nav'></img>
      </div>
      </NavLink>
      {
        user &&
        <p className='text-slate-200'>Hiii {user}</p>
      }
      <div className='flex items-center  font-medium text-slate-100 ml-20 '>
      
        <NavLink to={'/'}>
        <p> Home </p> 
        </NavLink>
      </div>
      <div className='flex items-center  font-medium text-slate-100 ml-20 '>
        {
          user ? <button onClick={logoutHandler}>Logout</button>
          :
          <NavLink to={'/login'}>
          <p> Login </p> 
          </NavLink>
        }
      </div>
      {
        !user &&
        <div className='flex items-center  font-medium text-slate-100 ml-20 '>
        <NavLink to={'/signup'}>
        <p> Signup </p> 
        </NavLink>
      </div>
      }
      
      {
        user && 
        <div className='flex items-center  font-medium text-slate-100 ml-20 '>
        <NavLink to={'/profile'}>
        <p> Profile </p> 
        </NavLink>
      </div>
      }
      {
        user && 
        <div className='flex items-center  font-medium text-slate-100 ml-20 '>
        <NavLink to={'/orders'}>
        <p> Your Orders </p> 
        </NavLink>
      </div>
      }
      
      {
        user &&
          <NavLink to={'/cart'}>
            <div className='text-white relative'>
                <BsFillCartFill className='text-2xl'></BsFillCartFill>
                {cartItems.isLoading ? (
                    <span className='absolute -top-1 -right-4' ><Spinner></Spinner></span>
                    ) : 
                    cartItems.isSuccess && cartItems.data && cartItems.data.length > 0 &&
                     (
                    <span className='absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white'>
                      {cartItems.data.length}
                    </span>
                    )}
            </div>
          </NavLink>
      }
      
    </nav>
    </div>
  )
}
