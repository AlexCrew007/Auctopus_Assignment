import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { setUser }  from './redux/slices/LoginSlice';
import { HashRouter as Router } from 'react-router-dom';


const storedToken = localStorage.getItem('access_token');
const storedRefreshToken = localStorage.getItem('refresh_token');


if (storedToken && storedRefreshToken) {
  store.dispatch(setUser({ token: JSON.parse(storedToken), refreshToken: JSON.parse(storedRefreshToken) }));

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <Provider store={store}>
    <App />
    <Toaster/>
  </Provider>
  </Router>
);


