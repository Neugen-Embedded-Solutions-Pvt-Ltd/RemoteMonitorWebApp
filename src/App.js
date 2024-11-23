import './App.css';

import HomePage from './components/homepage/HomePage';
import TempratureLive from './components/homepage/TempratureLive'; 
import Login from './components/login/Login';
import Register from './components/register/Register';

import React  from 'react';
import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  // const [user, setLoginformData] = useState({

  // })
  return (
    <div className="App">
       <Router>
         <Routes>
          <Route path='/'  element={<HomePage/>} ></Route>
          <Route path='/login'  element={<Login />}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/temprature'  element={<TempratureLive/>} ></Route>

          </Routes>
       </Router>
    </div>
  );
}

export default App;
