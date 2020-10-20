import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './comps/layout/Navbar';
import Dashboard from './comps/dashboard/Dashboard';
import ProjectDetails from './comps/projects/ProjectDetails';
import SignIn from './comps/auth/SignIn';
import SignUp from './comps/auth/SignUp';
import ProjectCreation from './comps/projects/ProjectCreation';
import Notfound from './comps/dashboard/Notfound';
import MobileNotifications from './comps/dashboard/MobileNotifications'
import M from  'materialize-css/dist/js/materialize.min.js';

// create app font color
// goal details background color

class App extends Component {
  componentDidMount() {
    let sidenav = document.querySelector('#slide-out');
    M.Sidenav.init(sidenav, {});
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, 
      {inDuration: 300, outDuration: 525, constrainWidth: false, coverTrigger: false});
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/project/:id" component={ProjectDetails} />
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create" component={ProjectCreation} />
            <Route path="/notifications" component={MobileNotifications} />
            <Route path="" component={Notfound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
