import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
       <div className='App'>
      <Route path='/home' component={Nav}/>

      <Route exact path="/" component={LandingPage}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/countries/AddActivity' component={AddActivity}/>
      <Route path='/countries/:id' component={Detail}/>
      </div>

      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
