import './App.css';
import Header from './components/header/Header.component';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login.page';
import Signup from './pages/signup.page';


function App() {



  return (
      <div className="App">
      <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
