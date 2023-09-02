
import './App.css';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Navbar } from './components/Navbar'
import {  Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';
import { PrivateRoute } from './components/PrivateRoute';
import { Orders } from './pages/Orders';
import { useUpdateTokenMutation } from './redux/services/api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  logout, setUser } from './redux/slices/LoginSlice';
import { CartItem } from './components/Cartitems';
import {  useSelector } from 'react-redux/es/hooks/useSelector';

function App() {

  const [updateTokens, useUpdateTokenMutationState] = useUpdateTokenMutation()
  const state = useSelector( (state)=> state)
  const refresh_token = state.login.refreshToken
  const dispatch = useDispatch()

  async function refreshTokens(refresh_token) {
    try { 
      const response = await updateTokens(refresh_token);
      if (response.data) {
        localStorage.setItem('access_token', JSON.stringify(response.data.access));
        localStorage.setItem('refresh_token', JSON.stringify(response.data.refresh));
        dispatch(setUser({ token: response.data.access, refreshToken: response.data.refresh }));
        console.log("updateing...........")
      }
      else if (response.error.status === 401) {
        console.log("Unauthorized. Logging out...");
        localStorage.clear();
        dispatch(logout());
      } else {
        console.error("Unexpected error:", response.statusText);
      }
    } catch (error) {
      if (error.status === 'rejected') {
        console.log("loggingggg.......out")
        dispatch(logout());
        localStorage.clear();
      }
    }
  }

  useEffect(() => {
    const threeMinutes = 3 * 60 * 1000
    const interval = setInterval(() => {
      if (refresh_token) {
        refreshTokens(refresh_token);
      }
    }, threeMinutes);
    return ()=> clearInterval(interval)
  }, [refresh_token, dispatch, updateTokens]);

  useEffect( ()=>{
    if(refresh_token){
      refreshTokens(refresh_token)
    }
  },[])

  return (
    <div className="">
    <div className='bg-slate-900' >
      <Navbar/>
    </div>
      <Routes>
          <Route path='/' element={<Home></Home>} />
          <Route path='/cart' element={<PrivateRoute><Cart></Cart></PrivateRoute>} />
          <Route path='/cartitems' element={<PrivateRoute><CartItem></CartItem></PrivateRoute>}/>
          <Route path='/login' element={<Login></Login>} />
          <Route path='/signup' element={<Signup></Signup>} />
          <Route path='/profile' element={<PrivateRoute><Profile></Profile></PrivateRoute>} />
          <Route  path='/orders' element={<PrivateRoute><Orders></Orders></PrivateRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
