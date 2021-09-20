import React from "react";
import { Route, Link, BrowserRouter as Router ,useHistory, Redirect  } from "react-router-dom";
import{ MainPageView }from "./MainPageView";
import About from "./About";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import WorkIcon from '@material-ui/icons/Work';
import InfoIcon from '@material-ui/icons/Info';
import {GlobalHistory} from '../../Helper/Middleware.Helper'
import HomeIcon from '@material-ui/icons/Home';
import{ ContactPage }from "./ContactPage";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  myClassName: {
    backgroundColor: "blue",
    position: "relative",
    "&:hover": {
      backgroundColor: "red"
    }
  }
}));
//sadsaddas
 export const Home = () => {
  const classes = useStyles();

  const history = useHistory();

  const location = {
    pathname: '/cases',
  }
   const handleClick =()=> {
    GlobalHistory.push('/cases');

  }
  return (
    <div className="App">
      
          <Router>
          <Route exact path="/">
    <Redirect to="/about" />
</Route>
         <nav className='navbar navbar-toggleable-sm'>


        <div className='collapse navbar-collapse justify-content-center' id='navbarNav'>
          <ul className='nav flex-column flex-md-row' role='nav'>
            <li className='nav-item'>
              {/* Note about Links: parent route is active when any child route is active (it has always class ¨'nav-link-active'). We want the link to '/' be active only when the index route is active. For this reason, we will use 'IndexLink' */}
              {/* <Link to='/about' className='nav-link' activeClassName='nav-link-active'>Home</Link> */}
              <Route render={({ history}) => (
      <IconButton color="inherit" className={classes.myClassName}>

<HomeIcon  onClick={() => { history.push('/contact') }} ></HomeIcon>
</IconButton>
)} />
              {/* 'activeClassName' allow us to add class when the link is active (current Route). Another option is using 'activeStyle' and CSS styles. */}
            </li>

            <li className='nav-item'>
              {/* Link is similar to <a/> tag. The difference is that Link is aware of the Router (screen) it is rendered in. It allows you to wire together links with Routes (via 'to' attribute). */}
              {/* <Link className='nav-link' activeClassName='nav-link-active' to=''>About</Link> */}
              <Route render={({ history}) => (
      <IconButton color="inherit" className={classes.myClassName}>

<InfoIcon  onClick={() => { history.push('/about') }} ></InfoIcon>
</IconButton>
)} />
            </li>

            <li className='nav-item'>
            
              <Route render={({ history}) => (
      <IconButton color="inherit" className={classes.myClassName}>

<PhotoLibraryIcon   onClick={() => { history.push('/gallery') }} ></PhotoLibraryIcon>
</IconButton>
)} />
              {/* <Link className='nav-link' activeClassName='nav-link-active' to='/gallery'>Gallery</Link> */}
            </li>

            <li className='nav-item'>
              {/* <Link className='nav-link' activeClassName='nav-link-active' to={location} >Cases</Link> */}
              <Route render={({ history}) => (
      <IconButton color="inherit" className={classes.myClassName}>

<WorkIcon   onClick={() => { history.push('/cases'); console.log("h",history) }}></WorkIcon>
</IconButton>
)} />
            </li>
          </ul>
  
        
        </div>
      </nav>
      

          <Route path="/about" component={About} />
          <Route exact path="/cases" component={MainPageView} />
          <Route exact path="/contact" component={ContactPage} />
   
   
      </Router>
    </div>
  );
};