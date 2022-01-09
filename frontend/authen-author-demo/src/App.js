import './App.css';
import Header from './components/header/Header.component';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login.page';
import Signup from './pages/signup.page';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { loginAction, logoutAction } from './redux/auth/auth.actions';

let logoutTimer;
const App = ({ login, logout, token, tokenExpirationDate }) => {

  useEffect(() => {
    if(token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    }else{
      clearTimeout(logoutTimer);
    }
  },[token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
      login(storedData.userId, storedData.token, new Date(storedData.expiration), storedData.email);
    }
  },[login]);

  return (
      <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<div>Home Page</div>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  login: (userId, token, expirationDate, email) => dispatch(loginAction(userId, token, expirationDate, email)),
  logout: () => dispatch(logoutAction())
})

const mapStateToProps = state => ({
  token: state.auth.token,
  tokenExpirationDate: state.auth.tokenExpirationDate
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
