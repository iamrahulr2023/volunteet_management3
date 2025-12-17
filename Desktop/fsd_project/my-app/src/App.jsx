import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Dashboard from './components/Dashboard';
import StudentDetail from './components/StudentDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import UnknownFaces from './components/UnknownFaces';

const App = () => {
  return (
    <>
  
   <Routes>
    
   
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/students/:id' element={<StudentDetail/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
     <Route path='/records' element={<UnknownFaces/>}/>
   </Routes>
    </>
  )
}

export default App