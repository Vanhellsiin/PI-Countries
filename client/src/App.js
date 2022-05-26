import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import LandingPage from './componentes/LandingPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <React.Fragment>

        <Route exact path='/' component={LandingPage}/>

    </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
