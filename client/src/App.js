import './App.css';
import { Route } from "react-router-dom";
import LandingPage from './components/Landingpage';
import Home from "./components/Home";
import Detail from "./components/Detail";
import NewActivity from './components/Create';
import NavBar from "./components/navbar"

function App() {
  return (
    <div className="App">
      <Route exact path="/home" render={() =><NavBar/>}/>
      <Route exact path="/" render={() =><LandingPage/>}/>
      <Route exact path="/home" render={() =><Home/>}/>
      <Route exact path="/countries/:id" render={() =><Detail/>}/>
      <Route exact path="/activity" render={() => <NewActivity/>}/>
    </div>
  );
}

export default App;
