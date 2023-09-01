
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
import { LoginSlice } from './redux/slices/LoginSlice';
import { CartItem } from './components/Cartitems';

function App() {

  const dispatch = useDispatch();
  const authTokens = JSON.parse(localStorage.getItem('refresh_token')) || null
  const [refreshTokensMutation, refreshTokensMutationState] = useUpdateTokenMutation();

  useEffect(() => {
    const threeMinutes = 3 * 60 * 1000

    const interval = setInterval(async () => {
    if (authTokens) {
      try {
        const authTokens = JSON.parse(localStorage.getItem('refresh_token'))
        if(authTokens){
          const response = await refreshTokensMutation(authTokens);
        
        if (response.data) {
          dispatch(LoginSlice.actions.setUser({ token: response.data.access, refreshToken: response.data.refresh }));
          console.log("Tokens refreshed successfully.");
        } else {
          console.error("No response received from token refresh.");
        }
      }
      } catch (error) {
        dispatch(LoginSlice.actions.logout());
        console.error("Error refreshing tokens:", error);
      }
    }
  }, threeMinutes);

  return () => clearInterval(interval);
}, [authTokens, refreshTokensMutationState]);

 

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
