import React from "react";
import { Route, Link, BrowserRouter as Router  } from "react-router-dom";
import{ MainPageView }from "./MainPageView";
import About from "./About";
//sadsaddas
export const Home = () => {
  return (
    <div className="App">
          <Router>
         <nav className='navbar navbar-toggleable-sm'>
       

        <div className='collapse navbar-collapse justify-content-center' id='navbarNav'>
          <ul className='nav flex-column flex-md-row' role='nav'>
            <li className='nav-item'>
              {/* Note about Links: parent route is active when any child route is active (it has always class ¨'nav-link-active'). We want the link to '/' be active only when the index route is active. For this reason, we will use 'IndexLink' */}
              <Link to='/about' className='nav-link' activeClassName='nav-link-active'>Home</Link>
              {/* 'activeClassName' allow us to add class when the link is active (current Route). Another option is using 'activeStyle' and CSS styles. */}
            </li>

            <li className='nav-item'>
              {/* Link is similar to <a/> tag. The difference is that Link is aware of the Router (screen) it is rendered in. It allows you to wire together links with Routes (via 'to' attribute). */}
              <Link className='nav-link' activeClassName='nav-link-active' to='/about'>About</Link>
            </li>

            <li className='nav-item'>
              <Link className='nav-link' activeClassName='nav-link-active' to='/gallery'>Gallery</Link>
            </li>

            <li className='nav-item'>
              <Link className='nav-link' activeClassName='nav-link-active' to='/users'>Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
      

          <Route path="/about" component={About} />
          <Route path="/users" component={MainPageView} />
   
      
      </Router>
    </div>
  );
};
