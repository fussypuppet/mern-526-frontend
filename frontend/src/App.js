import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import About from './components/About'
import Welcome from './components/Welcome'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <div className="react-router-logic">
        <Switch>
          <Route path='./signup' component={ Signup } />
          <Route path='./login' component={ Login } />
          <Route path='/about' component={ About } />
          <Route path='/' component={ Welcome } />  
        </Switch>   
      </div>
    </>
  );
}

export default App;
